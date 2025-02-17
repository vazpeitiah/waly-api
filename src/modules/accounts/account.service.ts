import { PrismaClient, Account } from '@prisma/client'

const prisma = new PrismaClient()

export const createAccount = async (
  data: Omit<Account, 'id' | 'createdAt'>
) => {
  return await prisma.account.create({
    data,
  })
}

export const getAccounts = async () => {
  return await prisma.account.findMany()
}

export const getAccountById = async (id: string) => {
  return await prisma.account.findUnique({
    where: { id },
  })
}

export const updateAccount = async (id: string, data: Partial<Account>) => {
  return await prisma.account.update({
    where: { id },
    data,
  })
}

export const deleteAccount = async (id: string) => {
  return await prisma.account.delete({
    where: { id },
  })
}
