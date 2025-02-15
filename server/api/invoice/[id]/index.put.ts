import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { invoiceBodySchema, invoiceIdSchema } from "~/schema/invoice";
import { Invoice_customers, Invoice_products } from '.prisma/client'

export default defineEventHandler(async (event): Promise<ResponseAPI> => {
    const idParam = getRouterParam(event, 'id')
    try {
        const body = await readBody(event)
        const id = invoiceIdSchema.parse(idParam)
        const data = invoiceBodySchema.parse(body)
        await prisma.$transaction(async (tx) => {

            await tx.invoice_products.deleteMany({
                where: { invoicesId: id }
            })

            await tx.invoice_customers.deleteMany({
                where: { invoicesId: id }
            })

            const invoice = await tx.invoices.update({
                where: { id },
                data
            })

            const customer = await tx.customers.findUnique({
                where: { id: data.customersId }
            }).then((item): Omit<Invoice_customers, 'id'> => {
                if (!item) {
                    throw new Error("Invoice customer not found")
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
                await tx.invoice_customers.createMany({
                    data: item
                })
            })

            const product = await tx.products.findMany({
                where: { id: { in: data.productId } }
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
            message: "Success Create Data Invoice",
            status: true
        }
    } catch (e: unknown) {
        setResponseStatus(event, 400)
        if (e instanceof z.ZodError) {
            return {
                message: "Error Validation at create",
                error: e.flatten().formErrors,
                status: false
            }
        }

        return {
            message: "Fail Create Data Invoice",
            error: '',
            status: false
        }
    }
})
