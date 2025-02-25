import type { Customers, Invoice_customers, Invoice_products, Invoices, Products } from '@prisma/client'
import { z } from "zod"

export const invoiceIdSchema = z.number()

type ExampleType= z.ZodType<Omit<Invoices, 'id' > & {
    productId: {
        id: number,
        qty: number
    }[],
    customerId: number,
    id?: number,
}>

export const invoiceBodySchemaCreate = z.object({
    id: z.number().optional(),
    tanggal_invoice: z.coerce.date(),//z.string().datetime(),
    ongkir: z.number(),
    discount: z.number(),
    total: z.number(),
    notes: z.string().min(2),
    status: z.string().min(2),
    uang_muka: z.number(),
    customerId: z.number(),
    productId: z.array(z.object({
        id: z.number(),
        qty: z.number(),
    })),
})

export const invoiceBodySchemaUpdate = z.object({
    id: z.number().optional(),
    tanggal_invoice: z.coerce.date(),//z.string().datetime(),
    ongkir: z.number(),
    discount: z.number(),
    total: z.number(),
    notes: z.string().min(2),
    status: z.string().min(2),
    uang_muka: z.number(),
    customerId: z.number(),
    // customerIdOld: z.number(),
    productId: z.array(z.object({
        id: z.number(),
        qty: z.number(),
    })),
    // productIdOld: z.array(z.number()),
})

export type InvoiceSchemaType = z.infer<typeof invoiceBodySchemaCreate>
export type InvoiceSchemaUpdateType = z.infer<typeof invoiceBodySchemaUpdate>

export type InvoiceProductCustomer = Invoices & {
    Invoice_products: Invoice_products[]
    Invoice_customers: Invoice_customers | null
}

export type InvoiceProductCustomerClient = Invoices & {
    Invoice_products: Invoice_products[]
    Invoice_customers: Invoice_customers
}

export type InvoiceResponse = {
    invoiceProps: InvoiceSchemaType,
    customersProps: Customers[],
    productsProps: Products[]
}