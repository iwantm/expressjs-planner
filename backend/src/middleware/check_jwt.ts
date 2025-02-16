import { expressjwt, type GetVerificationKey } from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import { AuthorizationError } from '../models'

export const checkJwt = (domain: string, audience: string) => {
  const express = expressjwt({
    secret: expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${domain}/.well-known/jwks.json`,
    }) as unknown as GetVerificationKey,
    audience: audience,
    issuer: `https://${domain}/`,
    algorithms: ['RS256'],
    onExpired: () => {
      throw new AuthorizationError('Token expired.')
    },
  })
  return express
}
