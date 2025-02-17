import dotenv from 'dotenv'
import { Router } from 'express'
import {
  login,
  getLoginGoogleUrl,
  loginGoogleCallback,
  register,
} from './auth.controller'

dotenv.config()

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.get('/google', getLoginGoogleUrl)
api.get('/google/callback', loginGoogleCallback)

export default api
