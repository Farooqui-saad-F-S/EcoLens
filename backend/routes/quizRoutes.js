import { Router } from 'express'
import { getQuizStats, saveQuizResult } from '../controllers/quizController.js'

const router = Router()

router.get('/stats', getQuizStats)
router.post('/', saveQuizResult)

export default router
