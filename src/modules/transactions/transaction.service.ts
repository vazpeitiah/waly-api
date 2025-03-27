import { PrismaClient, Transaction } from '@prisma/client'

const prisma = new PrismaClient()

export const createTransaction = async (
  data: Omit<Transaction, 'id' | 'createdAt'>
) => {
  return await prisma.transaction.create({
    data,
  })
}

export const getTransactions = async () => {
  return await prisma.transaction.findMany()
}

export const getTransactionById = async (id: string) => {
  return await prisma.transaction.findUnique({
    where: { id },
  })
}

export const updateTransaction = async (
  id: string,
  data: Partial<Transaction>
) => {
  return await prisma.transaction.update({
    where: { id },
    data,
  })
}

export const deleteTransaction = async (id: string) => {
  return await prisma.transaction.delete({
    where: { id },
  })
}
