import { PrismaClient, Category } from '@prisma/client'

const prisma = new PrismaClient()

export const createCategory = async (
  data: Omit<Category, 'id' | 'createdAt'>
) => {
  return await prisma.category.create({
    data,
  })
}

export const getCategories = async () => {
  return await prisma.category.findMany()
}

export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
  })
}

export const updateCategory = async (id: string, data: Partial<Category>) => {
  return await prisma.category.update({
    where: { id },
    data,
  })
}

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  })
}
