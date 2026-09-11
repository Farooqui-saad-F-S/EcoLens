import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import app from '../app.js'
import QuizResult from '../models/QuizResult.js'

let server
let apiUrl

before(() => {
  server = app.listen(0)
  apiUrl = `http://127.0.0.1:${server.address().port}`
})

after(() => {
  server.close()
})

test('POST /api/quiz-results validates and saves an anonymous result', async () => {
  const originalCreate = QuizResult.create
  let savedResult

  QuizResult.create = async (result) => {
    savedResult = result
    return result
  }

  try {
    const response = await fetch(`${apiUrl}/api/quiz-results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: 6, totalQuestions: 7, feedback: 'YES_A_LOT' }),
    })
    const body = await response.json()

    assert.equal(response.status, 201)
    assert.deepEqual(body, { success: true, message: 'Quiz result saved' })
    assert.deepEqual(savedResult, {
      score: 6,
      totalQuestions: 7,
      percentage: 85.7,
      feedback: 'YES_A_LOT',
    })
  } finally {
    QuizResult.create = originalCreate
  }
})

test('POST /api/quiz-results rejects an impossible score', async () => {
  const response = await fetch(`${apiUrl}/api/quiz-results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score: 8, totalQuestions: 7, feedback: 'SOMEWHAT' }),
  })
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.equal(body.success, false)
})

test('GET /api/quiz-results/stats returns anonymous aggregate values', async () => {
  const originalAggregate = QuizResult.aggregate

  QuizResult.aggregate = async () => [
    {
      summary: [
        {
          totalResponses: 4,
          averageScore: 5.875,
          averagePercentage: 73.812,
          highScoreResponses: 2,
        },
      ],
      feedback: [
        { _id: 'YES_A_LOT', count: 2 },
        { _id: 'SOMEWHAT', count: 1 },
        { _id: 'NOT_REALLY', count: 1 },
      ],
    },
  ]

  try {
    const response = await fetch(`${apiUrl}/api/quiz-results/stats`)
    const body = await response.json()

    assert.equal(response.status, 200)
    assert.deepEqual(body.stats, {
      totalResponses: 4,
      averageScore: 5.9,
      averagePercentage: 73.8,
      highScoreResponses: 2,
      feedback: { yesALot: 2, somewhat: 1, notReally: 1 },
    })
  } finally {
    QuizResult.aggregate = originalAggregate
  }
})

test('CORS allows the configured frontend instead of using a wildcard', async () => {
  const response = await fetch(`${apiUrl}/api/health`, {
    headers: { Origin: 'http://localhost:5173' },
  })

  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173')
  assert.notEqual(response.headers.get('access-control-allow-origin'), '*')
})

test('QuizResult model rejects a score greater than the total', async () => {
  const result = new QuizResult({
    score: 8,
    totalQuestions: 7,
    percentage: 114.3,
    feedback: 'YES_A_LOT',
  })

  await assert.rejects(result.validate())
})
