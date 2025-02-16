import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { invoiceBodySchemaUpdate, invoiceIdSchema } from "~/schema/invoice";
import { Invoice_customers, Invoice_products } from '.prisma/client'
import { responseError } from "~/server/service/responseError";

export default defineEventHandler(async (event): Promise<ResponseAPI> => {

    try {
        const { id } = getQuery(event)
        const body = await readBody(event)
        const {
            id: _,
            customerIdNew,
            // customerIdOld,
            // productIdOld,
            productIdNew,
            ...data
        } = invoiceBodySchemaUpdate.parse(body)

        console.log(`customerIdNew : ${ customerIdNew }, customerIdOld : `)
        console.log(`productIdNew : ${ productIdNew }, productIdOld : `)

        await prisma.$transaction(async (tx) => {
            const foundInvoice = await tx.invoices.findUnique({
                where: {
                    id: invoiceIdSchema.parse(Number(id))
                }
            })
            if (!foundInvoice) {
                throw new Error(`No invoice with id ${ id }`)
            }
            const invoice = await tx.invoices.update({
                where: { id: foundInvoice.id },
                data
            })

            await tx.invoice_customers.deleteMany({
                where: { invoicesId: invoice.id }
            })

            const customer = await tx.customers.findUnique({
                where: { id: customerIdNew }
            }).then((item): Omit<Invoice_customers, 'id'> => {
                if (!item) {
                    throw new Error(`Invoice customer not found with id ${customerIdNew  }`)
                }
                return ({
                    nama: item.nama,
                    alamat: item.alamat,
                    kota: item.kota,
                    tlp: item.tlp,
                    invoicesId: invoice.id,
                    customersId: item.id,
                })
            }).then(async (item) => {
                await tx.invoice_customers.create({
                    data: item
                })
            })
            await tx.invoice_products.deleteMany({
                where: { invoicesId: invoice.id }
            })

            const product = await tx.products.findMany({
                where: { id: { in: productIdNew } }
            }).then((productResponse): Omit<Invoice_products, 'id'>[] => {
                return productResponse.map((item) => ({
                        nama: item.nama,
                        keterangan: item.keterangan,
                        harga: item.harga,
                        jumlah: item.jumlah,
                        invoicesId: invoice.id,
                        productsId: item.id,
                    })
                )
            }).then(async (item) => {
                await tx.invoice_products.createMany({ data: item })
                return item
            })

            return { product, customer, invoice }
        })

        return {
            message: "Success Update Data Invoice",
            status: true
        }
    } catch (e: unknown) {
        return responseError(e, event, 'Fail Update Data Invoice')
    }
})
