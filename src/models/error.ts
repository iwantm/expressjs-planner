export class ServerError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'ServerError'
  }
}

export class DatabaseError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'DatabaseError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, cause?: unknown) {
    super(message, { cause })
    this.name = 'ValidationError'
  }
}
