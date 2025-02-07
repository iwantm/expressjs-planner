import { connect, Error } from 'mongoose'
import { logger } from '../utils'
import { DatabaseError } from '../models'

export async function connectDb(uri: string) {
  try {
    await connect(uri)
    logger.info('DB connection successful')
  } catch (e) {
    const err = e as Error
    throw new DatabaseError(`DB connection failed: ${err.message}`, err.cause)
  }
}
