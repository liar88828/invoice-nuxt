import type { ResponseAPI } from "~/interface/response"
import type { Customers } from '@prisma/client'
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event): Promise<ResponseAPI<Customers[]>> => {
    try {
        const query: { page: string, search: string, limit: string, name: string, city: string } = getQuery(event)
        const page = Number(query.page) || 1
        const pageSize =  Number(query.limit) // Set the page size
        const skip = (page - 1) * pageSize

        const customers = await prisma.customers.findMany({
            skip,
            take: pageSize,
            orderBy: [
                {
                    nama: query.name === 'Name' ? undefined
                        : query.name === 'A-Z' ? 'asc' : 'desc',
                },
            ],
            where: {
                nama: {
                    contains: query.search ?? '',
                },
                kota: {
                    contains: query.city === 'City' ? undefined : query.city,
                }
            },
        })

        const totalCount = await prisma.customers.count({
            where: {
                nama: {
                    contains: query.search ?? "",
                },
                kota: {
                    contains: query.city === 'City' ? undefined : query.city,
                }
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