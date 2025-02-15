import { Customers } from '.prisma/client'
import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { customerBodySchema } from "~/schema/customer"

export default defineEventHandler(async (event): Promise<ResponseAPI<Customers>> => {
    try {
        const body = await readBody(event)
        const customers = await prisma.customers.create({
            data: customerBodySchema.parse(body)
        })
        return {
            message: "Success Create Data customers",
            status: true,
            data: customers,
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
            message: "Fail Create Data customers",
            error: '',
            status: false
        }
    }
})
