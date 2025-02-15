import prisma from "~/lib/prisma"
import { productIdSchema } from "~/schema/product"

export const productCheck = async (id?: any) => {
    const data = await prisma.products.findUnique({
        select: { id: true },
        where: { id: productIdSchema.parse(Number(id)) }
    })
    if (!data) {
        throw new Error('The Data is Not Found')
    }
    return data
}