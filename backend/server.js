import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'
import { connectDb } from './config/db.js'

const port = Number(process.env.PORT) || 5000

async function startServer() {
  try {
    await connectDb()

    const server = app.listen(port, () => {
      console.log(`EcoLens API listening on port ${port}`)
    })

    async function shutDown() {
      server.close(async () => {
        await mongoose.connection.close()
        process.exit(0)
      })
    }

    process.on('SIGINT', shutDown)
    process.on('SIGTERM', shutDown)
  } catch (error) {
    console.error(`Unable to start EcoLens API: ${error.message}`)
    process.exit(1)
  }
}

startServer()
