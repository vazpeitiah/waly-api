import { NextFunction, Response, Request } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString()
  // eslint-disable-next-line no-console
  console.log(`${timestamp}: ${req.url} ${req.method}`)
  next()
}
