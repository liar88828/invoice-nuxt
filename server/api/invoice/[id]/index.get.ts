import  type { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import type { InvoiceProductCustomer } from "~/schema/invoice";
import { invoiceIdSchema } from "~/schema/invoice";
import { z } from "zod";
//get
export default defineEventHandler(async (event): Promise<ResponseAPI<InvoiceProductCustomer>> => {
    const { id } = getQuery(event)
    try {
        const invoices = await prisma.invoices.findUnique({
            include: {
                Invoice_customers: true,
                Invoice_products: true,
            },
            where: {
                id: invoiceIdSchema.parse(Number(id))
            },
        })
        if (!invoices) {
            throw new Error('The Data Invoice is Not Found')
        }

        return {
            message: "Success Find Data Invoice",
            status: true,
            data: invoices,
        }
    } catch (e: unknown) {
        if (e instanceof z.ZodError) {
            setResponseStatus(event, 400)
            return {
                message: "Error Validation",
                error: e.flatten().formErrors,
                status: false
            }
        }

        if (e instanceof Error) {
            setResponseStatus(event, 500)
            return {
                message: e.message,
                error: ["Something went wrong"],
                status: false
            }
        }

        setResponseStatus(event, 500)
        return {
            message: `Fail Find Data Customers by Id : ${id}`,
            error: ["Server Error"],
            status: false
        }
    }
})