import type { NextFunction, Request, Response } from 'express'
import { logger } from '../utils'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(`${err.message} - ${err.cause}`)
  res.status(500).json({ error: 'Internal Server Error' })
  next()
}
