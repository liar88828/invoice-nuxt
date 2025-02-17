import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { Customers, Products } from '.prisma/client'

export default defineEventHandler(async (event): Promise<ResponseAPI<Products[]>> => {
    try {
        const query: { search: string } = getQuery(event)
        const products = await prisma.products.findMany({
            take: 50,
            where: {
                nama: {
                    contains: query.search ?? '',
                },

            },
        })

        return {
            message: "Success Find Data products",
            status: true,
            data: products,
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