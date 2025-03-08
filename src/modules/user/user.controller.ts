import { NextFunction, Request, Response } from 'express'

import * as userService from './user.service'
import { userRequestSchema } from './user.schema'

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = userRequestSchema.parse({ id: req.user?.id })
    const userProfile = await userService.getUserProfile(data.id)
    res.status(200).json(userProfile)
  } catch (error) {
    next(error)
  }
}
