import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import type { InvoiceProductCustomer } from "~/schema/invoice";
import { z } from "zod";

export default defineEventHandler(async (event): Promise<ResponseAPI<InvoiceProductCustomer[]>> => {
    try {
        const query: { page: string, search: string } = getQuery(event)
        const page = Number(query.page) || 1
        const pageSize = 10 // Set the page size
        const skip = (page - 1) * pageSize

        const invoices = await prisma.invoices.findMany({
            skip,
            take: pageSize,
            include:{
                Invoice_customers:true,
                Invoice_products:true,
            },
            where: {
                // nama: {
                //     contains: query.search ?? ''
                // },
            },
        })

        const totalCount = await prisma.invoices.count({
            where: {
                // nama: {
                //     contains: query.search ?? "",
                // },
            },
        })

        return {
            message: "Success Find Data Invoice",
            status: true,
            data: invoices,
            meta: {
                currentPage: page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
                totalCount,
            },
        }
    } catch (e: unknown) {
        setResponseStatus(event, 400)
        if (e instanceof z.ZodError) {
            setResponseStatus(event, 400)
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
            message: `Fail Find Data Invoice by Id `,
            error: "",
            status: false
        }
    }
})