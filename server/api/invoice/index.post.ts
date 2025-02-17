import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { Invoice_customers, Invoice_products } from '.prisma/client'
import { invoiceBodySchemaCreate } from "~/schema/invoice";

export default defineEventHandler(async (event): Promise<ResponseAPI> => {
    try {
        const body = await readBody(event)
        const { customerId, productId, ...data } = invoiceBodySchemaCreate.parse(body)
        // console.log(data)
        await prisma.$transaction(async (tx) => {

            const invoice = await tx.invoices.create({
                data
            })

            const productDB = await tx.products.findMany({
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
            })
            // console.log(productDB)

            const product = await tx.invoice_products.createMany({
                data: productDB
            })

            const customerDB = await tx.customers.findUnique({
                where: { id: customerId }
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
            // console.log(customer)
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
