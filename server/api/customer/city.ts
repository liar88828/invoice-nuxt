import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event): Promise<ResponseAPI<{ kota: string }[]>> => {
    const query: { search: string } = getQuery(event)

    try {
        const customersCity = await prisma.customers.groupBy({
            by: [ 'kota' ],
            where: {
                nama: {
                    contains: query.search ?? '',
                },
            }
        })
        .then(data => {
            return data.map(item => ({ kota: item.kota }))
        })

        return {
            message: "Success Find Data Customers City",
            status: true,
            data: customersCity,

        }
    } catch (e: unknown) {
        setResponseStatus(event, 400)
        return {
            data: [],
            message: "Fail Get Customer city ",
            status: false
        }
    }
})