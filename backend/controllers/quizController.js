import QuizResult, { FEEDBACK_OPTIONS } from '../models/QuizResult.js'

function roundToOneDecimal(value) {
  return Math.round(value * 10) / 10
}

function validateSubmission({ score, totalQuestions, feedback }) {
  if (!Number.isInteger(score) || score < 0) {
    return 'Score must be a whole number greater than or equal to 0'
  }

  if (!Number.isInteger(totalQuestions) || totalQuestions < 1) {
    return 'Total questions must be a whole number greater than 0'
  }

  if (score > totalQuestions) {
    return 'Score cannot be greater than total questions'
  }

  if (!FEEDBACK_OPTIONS.includes(feedback)) {
    return 'Feedback must be YES_A_LOT, SOMEWHAT, or NOT_REALLY'
  }

  return null
}

export async function saveQuizResult(req, res) {
  const { score, totalQuestions, feedback } = req.body ?? {}
  const validationError = validateSubmission({ score, totalQuestions, feedback })

  if (validationError) {
    return res.status(400).json({ success: false, message: validationError })
  }

  try {
    const percentage = roundToOneDecimal((score / totalQuestions) * 100)

    await QuizResult.create({ score, totalQuestions, percentage, feedback })

    return res.status(201).json({
      success: true,
      message: 'Quiz result saved',
    })
  } catch (error) {
    console.error('Unable to save quiz result:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Unable to save the quiz result right now',
    })
  }
}

export async function getQuizStats(_req, res) {
  try {
    const [result] = await QuizResult.aggregate([
      {
        $facet: {
          summary: [
            {
              $group: {
                _id: null,
                totalResponses: { $sum: 1 },
                averageScore: { $avg: '$score' },
                averagePercentage: { $avg: '$percentage' },
                highScoreResponses: {
                  $sum: { $cond: [{ $gte: ['$percentage', 80] }, 1, 0] },
                },
              },
            },
          ],
          feedback: [
            {
              $group: {
                _id: '$feedback',
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ])

    const summary = result?.summary?.[0]
    const feedbackCounts = Object.fromEntries(
      (result?.feedback ?? []).map((item) => [item._id, item.count]),
    )

    return res.json({
      success: true,
      stats: {
        totalResponses: summary?.totalResponses ?? 0,
        averageScore: roundToOneDecimal(summary?.averageScore ?? 0),
        averagePercentage: roundToOneDecimal(summary?.averagePercentage ?? 0),
        highScoreResponses: summary?.highScoreResponses ?? 0,
        feedback: {
          yesALot: feedbackCounts.YES_A_LOT ?? 0,
          somewhat: feedbackCounts.SOMEWHAT ?? 0,
          notReally: feedbackCounts.NOT_REALLY ?? 0,
        },
      },
    })
  } catch (error) {
    console.error('Unable to load quiz statistics:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Unable to load quiz statistics right now',
    })
  }
}
