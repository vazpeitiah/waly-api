import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../config/auth'
import { User } from '@prisma/client'

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const payload = verifyToken(token) as Omit<User, 'password'> | null

    if (!payload) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    req.user = payload

    next()
  } catch (error) {
    next(error)
  }
}

export default authenticate
