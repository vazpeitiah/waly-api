import { z } from 'zod'

export const accountSchema = z
  .object({
    name: z.string().max(255, { message: 'Description is too long' }),
    type: z.enum(['bank', 'credit_card', 'cash', 'other']),
  })
  .strict()
