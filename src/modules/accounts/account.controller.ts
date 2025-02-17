import { NextFunction, Request, Response } from 'express'

import * as accountService from './account.service'
import { accountSchema } from './account.schema'

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, name } = req.body
    accountSchema.parse({ type, name })
    const account = await accountService.createAccount({
      type,
      name,
    })
    res.status(201).json(account)
  } catch (error) {
    next(error)
  }
}

export const getAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accounts = await accountService.getAccounts()
    res.status(200).json(accounts)
  } catch (error) {
    next(error)
  }
}

export const getAccountById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const account = await accountService.getAccountById(id)

    if (!account) {
      res.status(404).json({ message: 'Account not found' })
      return
    }

    res.status(200).json(account)
  } catch (error) {
    next(error)
  }
}

export const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { type, name } = req.body
    accountSchema.parse({ type, name })
    const updatedAccount = await accountService.updateAccount(id, {
      type,
      name,
    })

    res.status(200).json(updatedAccount)
  } catch (error) {
    next(error)
  }
}

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await accountService.deleteAccount(id)

    res.status(200).json({ message: 'Account deleted successfully' })
  } catch (error) {
    next(error)
  }
}
