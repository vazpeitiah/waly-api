import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import transactionRouter from './modules/transactions/transaction.router'
import accountRouter from './modules/accounts/account.router'
import categoriesRouter from './modules/categories/category.router'
import authRouter from './modules/auth/auth.router'
import authenticate from './middlewares/auth'

import { errorHandler } from './middlewares/errorHandler'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/ping', (_req, res) => {
  res.send('pong')
})
app.use('/transactions', authenticate, transactionRouter)
app.use('/accounts', authenticate, accountRouter)
app.use('/categories', authenticate, categoriesRouter)
app.use('/auth', authRouter)

app.use(errorHandler)

export default app
