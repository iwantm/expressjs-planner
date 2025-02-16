import * as winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warning',
  format: winston.format.json(),
  defaultMeta: { service: 'planner' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})
