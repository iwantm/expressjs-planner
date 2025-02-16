import express from 'express'
import { checkJwt, errorHandler, handleAuthErrors } from './middleware'
import { connectDb } from './config'
import { logger } from './utils'
import { taskRouter, projectRouter } from './routes'
import { env } from 'node:process'
import { EnvironmentSchema } from './utils/environment'

const app = express()
const port = 9092
const { mongoUri, auth0Domain, auth0Audience } = EnvironmentSchema.parse(env)

logger.info(`Starting application on port: ${port}`)

connectDb(`${mongoUri}`).catch((err: Error) =>
  logger.error(`${err.message}`, err)
)
app.use(express.json())
app.use(checkJwt(auth0Domain, auth0Audience))

app.use('/api/tasks', taskRouter)
app.use('/api/projects', projectRouter)

app.use(handleAuthErrors)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
