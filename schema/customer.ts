import type { Customers } from '.prisma/client'
import { z } from "zod"

export const customerBodySchema: z.ZodType<Omit<Customers, 'id'>> = z.object({
    id: z.number().optional(),
    nama: z.string().min(2),
    alamat: z.string().min(2),
    kota: z.string().min(2),
    tlp: z.string().min(2),
})


export const customerIdSchema = z.number()
export type CustomerSchemaType = z.infer<typeof customerBodySchema>
