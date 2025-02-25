import  type { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { invoiceBodySchemaUpdate, invoiceIdSchema } from "~/schema/invoice";
import type  { Invoice_customers, Invoice_products } from '@prisma/client'
import { responseError } from "~/server/service/responseError";

export default defineEventHandler(async (event): Promise<ResponseAPI> => {

    try {
        const { id } = getQuery(event)
        const body = await readBody(event)
        const {
            id: _,
            customerId,
            // customerIdOld,
            // productIdOld,
            productId,
            ...data
        } = invoiceBodySchemaUpdate.parse(body)

        // console.log(`customerId : ${ customerId }, customerIdOld : `)
        // console.log(`productId : ${ productId }, productIdOld : `)

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
                where: { id: customerId }
            }).then((item): Omit<Invoice_customers, 'id'> => {
                if (!item) {
                    throw new Error(`Invoice customer not found with id ${customerId  }`)
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
                where: {
                    id: { in: productId.map(item => item.id) }
                }
            }).then((productResponse): Omit<Invoice_products, 'id'>[] => {
                return productResponse.map((item) => {
                    const product = productId.find((product) => product.id === item.id); // Find the matching productId by id
                    return {
                        nama: item.nama,
                        keterangan: item.keterangan,
                        harga: item.harga,
                        jumlah: product ? product.qty : 0, // If a matching product is found, use its qty, otherwise default to 0
                        invoicesId: invoice.id,
                        productsId: item.id,
                    };
                });
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
