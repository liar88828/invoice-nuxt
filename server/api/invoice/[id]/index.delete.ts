import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { productIdSchema } from "~/schema/product"
import { invoiceIdSchema } from "~/schema/invoice";

export default defineEventHandler(async (event): Promise<ResponseAPI> => {
    const id = getRouterParam(event, 'id')
    try {
        await prisma.$transaction(async (tx) => {

            const data = await tx.invoices.findUnique({
                select: {
                    id: true,
                },
                where: { id: invoiceIdSchema.parse(id) }
            })

            if (!data) {
                throw new Error('The Data is Not Found')
            }

            await tx.invoice_products.deleteMany({
                where: {
                    invoicesId: data.id
                }
            })

            await tx.invoice_customers.deleteMany({
                where: {
                    invoicesId: data.id
                }
            })
            await tx.invoices.delete({
                where: { id: productIdSchema.parse(id) }
            })
        })

        return {
            message: `Success Delete Invoice Id ${ id }`,
            status: true,
        }
    } catch (e) {
        setResponseStatus(event, 400)
        if (e instanceof z.ZodError) {
            return {
                message: "Error Validation",
                error: e.flatten().formErrors,
                status: false
            }
        }

        if (e instanceof Error) {
            setResponseStatus(event, 404)
            return {
                message: e.message,
                error: "",
                status: false
            }
        }
        setResponseStatus(event, 500)
        return {
            message: `Fail Find Data customers by Id : ${ id }`,
            error: "",
            status: false
        }
    }
})
