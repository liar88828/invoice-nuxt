import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { Customers } from '.prisma/client'

export default defineEventHandler(async (event): Promise<ResponseAPI<Customers[]>> => {
    try {
        const query: { page: string, search: string } = getQuery(event)
        console.log(query,'execute')
        const page = Number(query.page) || 1
        const pageSize = 10 // Set the page size
        const skip = (page - 1) * pageSize

        const customers = await prisma.customers.findMany({
            // skip,
            // take: pageSize,
            where: {
                nama: {
                    contains: query.search ?? ''
                },
            },
        })

        const totalCount = await prisma.customers.count({
            where: {
                nama: {
                    contains: query.search ?? "",
                },
            },
        })

        return {
            message: "Success Find Data Customers",
            status: true,
            data: customers,
            meta: {
                currentPage: page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize),
                totalCount,
            },
        }
    } catch (e: unknown) {
        setResponseStatus(event, 400)
        return {
            data: [],
            message: "Fail ",
            status: false
        }
    }
})