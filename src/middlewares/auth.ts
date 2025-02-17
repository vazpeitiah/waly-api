import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../config/auth'

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const payload = verifyToken(token)

    if (!payload) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default authenticate
