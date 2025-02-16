import { z } from 'zod'

export const EnvironmentSchema = z
  .object({
    MONGO_URI: z.string(),
    AUTH0_DOMAIN: z.string(),
    AUTH0_AUDIENCE: z.string(),
  })
  .transform((vars) => {
    const { MONGO_URI, AUTH0_DOMAIN, AUTH0_AUDIENCE } = vars
    return {
      mongoUri: MONGO_URI,
      auth0Domain: AUTH0_DOMAIN,
      auth0Audience: AUTH0_AUDIENCE,
    }
  })

export type EnvironmentSchema = z.infer<typeof EnvironmentSchema>
