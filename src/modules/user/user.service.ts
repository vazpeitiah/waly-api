import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserProfile = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
    },
  })
}
