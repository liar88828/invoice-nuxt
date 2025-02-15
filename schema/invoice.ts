import type { Invoice_customers, Invoice_products, Invoices } from '.prisma/client'
import { z } from "zod"

export const invoiceIdSchema = z.number()
type ExampleType= z.ZodType<Omit<Invoices, 'id' > & {
    productId: number[],
    customersId: number,
    id?: number,
}>

export const invoiceBodySchema = z.object({
    id: z.number().optional(),
    tanggal_invoice: z.coerce.date(),//z.string().datetime(),
    ongkir: z.number(),
    discount: z.number(),
    total: z.number(),
    notes: z.string().min(2),
    status: z.string().min(2),
    uang_muka: z.number(),
    customersId: z.number(),
    productId: z.array(z.number())
})
export type InvoiceSchemaType = z.infer<typeof invoiceBodySchema>

export type InvoiceProductCustomer = Invoices & {
    Invoice_products: Invoice_products[]
    Invoice_customers: Invoice_customers
}
