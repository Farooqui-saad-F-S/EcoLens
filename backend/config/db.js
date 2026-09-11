import mongoose from 'mongoose'

export async function connectDb() {
  const { MONGODB_URI } = process.env

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is required. Copy .env.example to .env and add your connection string.')
  }

  await mongoose.connect(MONGODB_URI)
  console.log('MongoDB connected')
}
