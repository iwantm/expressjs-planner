import { expressjwt, type GetVerificationKey, type Request } from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import type { NextFunction, Response } from 'express'
import { AuthorizationError } from '../models'

export const checkJwt = (domain: string, audience: string) =>
  expressjwt({
    secret: expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${domain}/.well-known/jwks.json`,
    }) as unknown as GetVerificationKey,

    audience: audience,
    issuer: `https://${domain}/`,
    algorithms: ['RS256'],
  })

export function handleNoAuth(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'invalid token...' })
    throw new AuthorizationError('Token invalid', err)
  } else {
    next(err)
  }
}
