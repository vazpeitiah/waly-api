import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.transaction.createMany({
    data: [
      {
        amount: 500,
        type: 'income',
        category: 'Salary',
        description: 'Monthly salary',
      },
      {
        amount: 50,
        type: 'expense',
        category: 'Groceries',
        description: 'Weekly groceries',
      },
      {
        amount: 20,
        type: 'expense',
        category: 'Transport',
        description: 'Bus ticket',
      },
    ],
  })

  // eslint-disable-next-line no-console
  console.log('Datos de prueba insertados ✅')
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
