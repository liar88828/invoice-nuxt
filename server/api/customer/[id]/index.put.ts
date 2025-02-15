import { Customers, Products } from '.prisma/client'
import { z } from "zod"
import { ResponseAPI } from "~/interface/response"
import prisma from "~/lib/prisma"
import { customerBodySchema } from '~/schema/customer'
import { customerCheck } from "~/server/service/customer";
export default defineEventHandler(async (event): Promise<ResponseAPI<Customers>> => {
    const { id } = getQuery(event)

    try {
        const body = await readBody(event)
        const data = await customerCheck(id)

        return {
            message: `Success Update Data ${id}`,
            status: true,
            data: await prisma.customers.update({
                where: { id: data.id },
                data: customerBodySchema.parse(body)
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
            message: "Fail Update Data Customers",
            error: "",
            status: false
        }

    }
})
