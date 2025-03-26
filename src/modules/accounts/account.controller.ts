import { NextFunction, Request, Response } from 'express'

import * as accountService from './account.service'
import { accountSchema } from './account.schema'

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = accountSchema.parse(req.body)
    const account = await accountService.createAccount(data)
    res.status(201).json(account)
  } catch (error) {
    next(error)
  }
}

export const getAccounts = async (
  _req: Request,
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
    const body = accountSchema.parse(req.body)
    const updatedAccount = await accountService.updateAccount(id, body)

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

    const deletedAccount = await accountService.deleteAccount(id)

    res.status(200).json(deletedAccount)
  } catch (error) {
    next(error)
  }
}
