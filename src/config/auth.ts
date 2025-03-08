import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import { User } from '@prisma/client'
import { TOKEN_EXPIRATION } from '../utils/consts'

const JWT_SECRET = process.env.JWT_SECRET || ''

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export const generateJWT = (user: Omit<User, 'password'>) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    {
      expiresIn: Math.floor(TOKEN_EXPIRATION / 1000),
    }
  )
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

export const getGoogleAuthURL = () => {
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['profile', 'email'],
  })
}

export const getGoogleUser = async (code: string) => {
  const { tokens } = await client.getToken(code)
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()
  if (!payload) throw new Error('No se pudo verificar el usuario')

  return {
    email: payload.email!,
    name: payload.name!,
    picture: payload.picture,
  }
}
