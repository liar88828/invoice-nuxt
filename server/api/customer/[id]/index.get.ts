import type { Customers } from '@prisma/client'
import { z } from "zod"
import  type { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { customerIdSchema } from '~/schema/customer'

export default defineEventHandler(async (event): Promise<ResponseAPI<Customers>> => {
    const { id } = getQuery(event)

    try {
        const data = await prisma.customers.findUnique({
            where: { id: customerIdSchema.parse(Number(id)) }
        })

        if (!data) {
            throw new Error('The Data Customer is Not Found')
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
                error: ["Something Error"],
                status: false
            }
        }
        return {
            message: `Fail Find Data Customers by Id : ${id}`,
            error: ["Server Error"],
            status: false
        }

    }
})
