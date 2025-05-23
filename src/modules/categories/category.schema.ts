import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().nonempty().max(255, { message: 'Name is too long' }),
})
