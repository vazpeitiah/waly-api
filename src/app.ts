import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import transactionRouter from './modules/transactions/transaction.router'
import accountRouter from './modules/accounts/account.router'
import categoriesRouter from './modules/categories/category.router'
import authRouter from './modules/auth/auth.router'
import userRouter from './modules/user/user.router'
import authenticate from './middlewares/auth'

import { errorHandler } from './middlewares/errorHandler'
import { logger } from './middlewares/logger'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
)
app.use(express.json())
app.use(logger)

app.get('/ping', (_req, res) => {
  res.send('pong')
})
app.use('/transactions', authenticate, transactionRouter)
app.use('/accounts', authenticate, accountRouter)
app.use('/categories', authenticate, categoriesRouter)
app.use('/user', authenticate, userRouter)
app.use('/auth', authRouter)

app.use(errorHandler)

export default app
