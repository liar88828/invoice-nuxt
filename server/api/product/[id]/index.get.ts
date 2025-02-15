import { Products } from './../../../../node_modules/.prisma/client/index.d'
import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { productIdSchema } from "~/schema/product"

export default defineEventHandler(async (event): Promise<ResponseAPI<Products>> => {
    const { id } = getQuery(event)

    try {
        const data = await prisma.products.findUnique({
            where: { id: productIdSchema.parse(Number(id)) }
        })

        if (!data) {
            throw new Error('The Data is Not Found')
        }

        return {
            message: 'Success Find Data Id',
            status: true,
            data: data
        }

    } catch (e) {
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
            message: `Fail Find Data Product by Id : ${id}`,
            error: "",
            status: false
        }

    }
})
