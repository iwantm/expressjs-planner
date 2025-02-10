import { connect } from 'mongoose'
import { logger } from '../utils'
import { DatabaseError } from '../models'

export async function connectDb(uri: string) {
  try {
    await connect(uri)
    logger.info('DB connection successful')
  } catch (e) {
    throw new DatabaseError(`Failed to connect to database.`, e)
  }
}
