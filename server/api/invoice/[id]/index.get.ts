import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import type { InvoiceProductCustomer } from "~/schema/invoice";
import { invoiceIdSchema } from "~/schema/invoice";
import { z } from "zod";

export default defineEventHandler(async (event): Promise<ResponseAPI<InvoiceProductCustomer>> => {
    const id = getRouterParam(event, 'id')
    try {
        const invoices = await prisma.invoices.findUnique({
            include: {
                Invoice_customers: true,
                Invoice_products: true,
            },
            where: {
                id: invoiceIdSchema.parse(id)
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
        setResponseStatus(event, 400)
        if (e instanceof z.ZodError) {
            return {
                message: "Error Validation",
                error: e.flatten().formErrors,
                status: false
            }
        }

        if (e instanceof Error) {
            return {
                message: e.message,
                error: "",
                status: false
            }
        }
        return {
            message: `Fail Find Data Customers by Id : ${id}`,
            error: ["Server Error"],
            status: false
        }
    }
})