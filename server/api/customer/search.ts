import type { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import type { Customers } from '@prisma/client'

export default defineEventHandler(async (event): Promise<ResponseAPI<Customers[]>> => {
    try {
        const query: { search: string } = getQuery(event)
        // console.log(query)
        const customers = await prisma.customers.findMany({
            take: 50,
            where: {
                nama: {
                    contains: query.search ?? '',
                },
            },
        })

        return {
            message: "Success Find Data Customers",
            status: true,
            data: customers,
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