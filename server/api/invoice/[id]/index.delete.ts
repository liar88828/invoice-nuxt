import  type { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { responseError } from "~/server/service/responseError";

export default defineEventHandler(async (event): Promise<ResponseAPI> => {
    const { id } = getQuery(event)
    try {
        await prisma.$transaction(async (tx) => {

            const data = await tx.invoices.findUnique({
                select: { id: true },
                where: { id: Number(id) }
            })

            if (!data) {
                throw new Error('The Data is Not Found')
            }

            await tx.invoice_products.deleteMany({
                where: { invoicesId: data.id }
            })

            await tx.invoice_customers.deleteMany({
                where: { invoicesId: data.id }
            })

            await tx.invoices.delete({
                where: { id: data.id }
            })
        })

        return {
            message: `Success Delete Invoice Id ${ id }`,
            status: true,
        }
    } catch (e) {
        return responseError(e, event, 'invoice')
    }
})
