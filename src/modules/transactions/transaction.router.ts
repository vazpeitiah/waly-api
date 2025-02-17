import { Router } from 'express'
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
  updateTransaction,
} from './transaction.controller'

const router = Router()

router.get('/', getTransactions)
router.post('/', createTransaction)
router.get('/:id', getTransactionById)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)

export default router
