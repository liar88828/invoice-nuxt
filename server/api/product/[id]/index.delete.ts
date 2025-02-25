import { type Products } from '@prisma/client'
import { z } from "zod"
import { type ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { productCheck } from '~/server/service/product'

export default defineEventHandler(async (event): Promise<ResponseAPI<Products>> => {
    // const id = getRouterParam(event, 'id')
    const { id } = getQuery(event)
    try {

        const data = await productCheck(id)

        const product = await prisma.products.delete({
            where: { id: data.id }
        })

        return {
            message: `Success Delete Product Id ${id}`,
            status: true,
            data: product
        }
    } catch (e) {
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
            message: `Fail Find Data Product by Id : ${id}`,
            error: "",
            status: false
        }

    }
})
