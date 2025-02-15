import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { invoiceBodySchema } from "~/schema/invoice";
import { Invoice_customers, Invoice_products } from '.prisma/client'

export default defineEventHandler(async (event): Promise<ResponseAPI> => {
    try {
        const body = await readBody(event)
        const { customersId, productId, ...data } = invoiceBodySchema.parse(body)
        // console.log(data)
        await prisma.$transaction(async (tx) => {

            const invoice = await tx.invoices.create({
                data
            })

            const productDB = await tx.products.findMany({
                where: {
                    id: {
                        in: productId.map(item => item)
                    }
                }
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
            })
            console.log(productDB)

            const product = await tx.invoice_products.createMany({
                data: productDB
            })

            const customerDB = await tx.customers.findUnique({
                where: { id: customersId }
            }).then((item): Omit<Invoice_customers, 'id'> => {
                if (!item) {
                    throw new Error('Data Customer is Not Found')
                }
                return ({
                    nama: item.nama,
                    alamat: item.alamat,
                    kota: item.kota,
                    tlp: item.tlp,
                    invoicesId: invoice.id,
                    customersId: item.id,
                })
            })

            const customer = await tx.invoice_customers.createMany({
                data: customerDB
            })
            console.log(customer)
            return { product, customer, invoice }
        })

        return {
            message: "Success Create Data Invoice",
            status: true
        }
    } catch (e: unknown) {

        if (e instanceof z.ZodError) {
            setResponseStatus(event, 400)
            return {
                message: "Error Validation at create",
                error: e.flatten().formErrors,
                status: false
            }
        }

        setResponseStatus(event, 500)
        return {
            message: "Fail Create Data Invoice",
            status: false
        }
    }
})
