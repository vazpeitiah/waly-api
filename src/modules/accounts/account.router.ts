import { Router } from 'express'
import {
  createAccount,
  getAccounts,
  deleteAccount,
  getAccountById,
  updateAccount,
} from './account.controller'

const router = Router()

router.post('/', createAccount)
router.get('/', getAccounts)
router.get('/:id', getAccountById)
router.put('/:id', updateAccount)
router.delete('/:id', deleteAccount)

export default router
