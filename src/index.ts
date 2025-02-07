import express from 'express'
import { errorHandler } from './middleware'
import { connectDb } from './config'
import { logger } from './utils'
import { taskRouter, projectRouter } from './routes'
import { env } from 'bun'

const app = express()
const port = 9092
const { MONGO_URI } = env

logger.info(`Starting application on port: ${port}`)

connectDb(`${MONGO_URI}`).catch((err: Error) =>
  logger.error(`${err.message} - ${err.cause}`)
)
app.use(express.json())

app.use('/api/tasks', taskRouter)
app.use('/api/projects', projectRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
