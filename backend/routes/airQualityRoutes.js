import { Router } from 'express'
import { getAirQualityForCoordinates } from '../controllers/airQualityController.js'

const router = Router()

router.get('/', getAirQualityForCoordinates)

export default router