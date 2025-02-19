import dotenv from 'dotenv'
import { Router } from 'express'
import {
  login,
  getLoginGoogleUrl,
  loginGoogleCallback,
  register,
  verify,
  logout,
} from './auth.controller'
import authenticate from '../../middlewares/auth'

dotenv.config()

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.get('/google', getLoginGoogleUrl)
api.get('/google/callback', loginGoogleCallback)
api.get('/verify', authenticate, verify)
api.post('/logout', authenticate, logout)

export default api
