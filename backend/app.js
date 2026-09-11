import cors from 'cors'
import express from 'express'
import quizRoutes from './routes/quizRoutes.js'

const app = express()
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: frontendUrl,
    methods: ['GET', 'POST'],
  }),
)
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'EcoLens API is running' })
})

app.use('/api/quiz-results', quizRoutes)

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ success: false, message: 'Request body must be valid JSON' })
  }

  console.error('Unexpected API error:', error.message)
  return res.status(500).json({ success: false, message: 'Unexpected server error' })
})

export default app
