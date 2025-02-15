import prisma from "~/lib/prisma"
import { customerIdSchema } from "~/schema/customer"
import { productIdSchema } from "~/schema/product"

export const customerCheck = async (id?: any) => {
    const data = await prisma.customers.findUnique({
        select: { id: true },
        where: { id: customerIdSchema.parse(Number(id)) }
    })
    if (!data) {
        throw new Error('The Data is Not Found')
    }
    return data
}