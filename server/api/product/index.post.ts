import { z } from "zod"
import type { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { productBodySchema } from "~/schema/product"
import type { Products } from "@prisma/client";

export default defineEventHandler(async (event): Promise<ResponseAPI<Products>> => {
    try {
        const body = await readBody(event)
        const product = await prisma.products.create({
            data: productBodySchema.parse(body)
        })
        return {
            message: "Success Create Data Product",
            status: true,
            data: product,
        }
    } catch (e: unknown) {
        setResponseStatus(event, 400)
        if (e instanceof z.ZodError) {
            return {
                message: "Error Validation at create",
                error: e.flatten().formErrors,
                status: false
            }
        }

        return {
            message: "Fail Create Data Product",
            error: '',
            status: false
        }
    }
})
