import { Products } from './../../../node_modules/.prisma/client/index.d'
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event): Promise<ResponseAPI<Products[]>> => {
    try {
        const query: { page: string, search: string, limit: string, name: string, price: string } = getQuery(event)
        // console.log('test', query)

        const page = Number(query.page) || 1
        const pageSize = Number(query.limit) ?? 10 // Set the page size
        const skip = (page - 1) * pageSize

        const products = await prisma.products.findMany({
            skip,
            take: pageSize,
            orderBy: [
                {
                    nama: query.name === 'Default' ? undefined
                        : query.name === 'A-Z' ? 'asc' : 'desc',
                },

                {
                    harga: query.price === 'Default' ? undefined
                        : query.price === 'Low' ? 'asc' : 'desc'
                }
            ],
            where: {
                nama: {
                    contains: query.search ?? ''
                },
            },
        })

        const totalCount = await prisma.products.count({
            where: {
                nama: {
                    contains: query.search ?? "",
                },
            },
        })

        return {
            message: "Success Find Data Product",
            status: true,
            data: products,
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