import { z } from 'zod'

export const transactionSchema = z
  .object({
    amount: z.number().min(0, { message: 'Amount must be a positive number' }),
    date: z.coerce.date(),
    type: z.enum(['income', 'expense', 'transfer']),
    category: z
      .string()
      .nonempty()
      .max(255, { message: 'Category is too long' }),
    description: z
      .string()
      .nonempty()
      .max(255, { message: 'Description is too long' }),
  })
  .strict()
