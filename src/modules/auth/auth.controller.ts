import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import { loginSchema, userSchema } from './auth.schema'
import { prisma } from '../../config/db'
import { generateJWT, getGoogleAuthURL, getGoogleUser } from '../../config/auth'

const FRONTEND_URL = `${process.env.FRONTEND_URL}/login`

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body
    const user = userSchema.parse({ email, password, name })
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    })
    if (existingUser) {
      res.status(400).json({ message: 'El usuario ya existe' })
      return
    }

    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
      data: { ...user, password: hashedPassword },
    })
    const token = generateJWT(newUser)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.json({ success: true, token })
  } catch (error) {
    next(error)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = loginSchema.parse({ email, password })
    const userFound = await prisma.user.findUnique({
      where: { email: user.email },
    })
    if (!userFound || !userFound.password) {
      res.status(401).json({ message: 'Credenciales inválidas' })
      return
    }

    const validPassword = await bcrypt.compare(
      user.password,
      userFound!.password
    )
    if (!validPassword) {
      res.status(401).json({ message: 'Credenciales inválidas' })
      return
    }
    const token = generateJWT(userFound)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.json({ success: true, token })
  } catch (error) {
    next(error)
  }
}

export const getLoginGoogleUrl = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ url: getGoogleAuthURL() })
  } catch (error) {
    next(error)
  }
}

export const loginGoogleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.query
    if (!code) {
      res.status(400).json({ message: 'Código requerido' })
      return
    }

    const googleUser = await getGoogleUser(code as string)

    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          password: '', // No se necesita contraseña para usuarios de Google
        },
      })
    }

    const token = generateJWT(user)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    res.redirect(FRONTEND_URL)
  } catch (error) {
    next(error)
  }
}

export const verify = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ isValid: true })
  } catch (error) {
    next(error)
  }
}

export const logout = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('token')
    res.json({
      message: 'Session closed',
    })
  } catch (error) {
    next(error)
  }
}
