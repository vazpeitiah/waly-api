import { NextFunction, Request, Response } from 'express'

import * as transactionService from './transaction.service'
import { transactionSchema } from './transaction.schema'

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, type, description, category } = req.body
    transactionSchema.parse({ amount, type, description, category })
    const transaction = await transactionService.createTransaction({
      amount,
      type,
      description,
      category,
    })
    res.status(201).json(transaction)
  } catch (error) {
    next(error)
  }
}

export const getTransactions = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactions = await transactionService.getTransactions()
    res.status(200).json(transactions)
  } catch (error) {
    next(error)
  }
}

export const getTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const transaction = await transactionService.getTransactionById(id)

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' })
      return
    }

    res.status(200).json(transaction)
  } catch (error) {
    next(error)
  }
}

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { amount, type, description, category } = req.body
    const updatedTransaction = await transactionService.updateTransaction(id, {
      amount,
      type,
      description,
      category,
    })

    res.status(200).json(updatedTransaction)
  } catch (error) {
    next(error)
  }
}

export const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await transactionService.deleteTransaction(id)

    res.status(200).json({ message: 'Transaction deleted successfully' })
  } catch (error) {
    next(error)
  }
}
