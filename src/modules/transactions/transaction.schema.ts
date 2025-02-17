import { z } from 'zod'

export const transactionSchema = z.object({
  amount: z.number().min(0, { message: 'Amount must be a positive number' }),
  type: z.enum(['income', 'expense', 'transfer']),
  description: z.string().max(255, { message: 'Description is too long' }),
})
