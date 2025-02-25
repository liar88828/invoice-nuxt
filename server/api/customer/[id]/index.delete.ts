import type { Customers } from '@prisma/client'
import { z } from "zod"
import type { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { customerCheck } from '~/server/service/customer'

export default defineEventHandler(async (event): Promise<ResponseAPI<Customers>> => {
    // const id = getRouterParam(event, 'id')
    const { id } = getQuery(event)

    try {

        const data = await customerCheck(id)

        const customer = await prisma.customers.delete({
            where: { id: data.id }
        })

        return {
            message: `Success Delete customers Id ${id}`,
            status: true,
            data: customer
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
            setResponseStatus(event, 404)
            return {
                message: e.message,
                error: "",
                status: false
            }
        }
        setResponseStatus(event, 500)
        return {
            message: `Fail Find Data customers by Id : ${id}`,
            error: "",
            status: false
        }

    }
})
