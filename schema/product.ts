import type { Products } from '.prisma/client'
import { z } from "zod"

export const productBodySchema: z.ZodType<Omit<Products, 'id'>> = z.object({
    id: z.number().optional(),
    nama: z.string().min(2),
    keterangan: z.string().min(2),
    harga: z.number(),
    jumlah: z.number(),
})


export const productIdSchema = z.number()

export type ProductSchemaType = z.infer<typeof productBodySchema>