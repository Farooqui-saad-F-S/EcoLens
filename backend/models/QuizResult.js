import mongoose from 'mongoose'

export const FEEDBACK_OPTIONS = ['YES_A_LOT', 'SOMEWHAT', 'NOT_REALLY']

const quizResultSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'Score must be a whole number',
      },
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Total questions must be a whole number',
      },
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    feedback: {
      type: String,
      required: true,
      enum: FEEDBACK_OPTIONS,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
)

quizResultSchema.path('score').validate(function scoreDoesNotExceedTotal(score) {
  return !Number.isInteger(this.totalQuestions) || score <= this.totalQuestions
}, 'Score cannot be greater than total questions')

const QuizResult = mongoose.model('QuizResult', quizResultSchema)

export default QuizResult
