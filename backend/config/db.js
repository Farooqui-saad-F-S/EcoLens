import mongoose from 'mongoose'

let connectionPromise = null

export async function connectDb() {
  const { MONGODB_URI } = process.env

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is required. Copy .env.example to .env and add your connection string.',
    )
  }

  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  // Reuse an existing connection attempt
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(MONGODB_URI).catch((error) => {
      connectionPromise = null
      throw error
    })
  }

  await connectionPromise

  return mongoose.connection
}