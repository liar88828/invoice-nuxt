import { Products } from '.prisma/client'
import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { productBodySchema, productIdSchema } from "~/schema/product"
import { productCheck } from '~/server/service/product'
export default defineEventHandler(async (event): Promise<ResponseAPI<Products>> => {
    const { id } = getQuery(event)

    try {
        const body = await readBody(event)
        const data = await productCheck(id)

        return {
            message: `Success Update Data ${id}`,
            status: true,
            data: await prisma.products.update({
                where: { id: data.id },
                data: productBodySchema.parse(body)
            })
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
                status: false
            }
        }
        return {
            message: "Fail Update Data Product",
            error: "",
            status: false
        }

    }
})
