import type { NextFunction, Request, Response } from 'express'
import { logger } from '../utils'
import { AuthorizationError } from '../models'

export function handleAuthErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'invalid token...' })
    throw new AuthorizationError('Token invalid.', err)
  }
  if (err.name === 'JwksError') {
    res.status(401).json({ message: 'invalid token...' })
    throw new AuthorizationError('Failed to retrieve JWKs.', err)
  }
  return next(err)
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({ message: err.message, cause: err.cause })

  res.status(500).json({ error: 'Internal Server Error' })
  return next()
}
