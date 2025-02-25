import type { ResponseAPI } from "~/interface/response"
import { responseError } from "~/server/service/responseError";
import type { CountResponse } from "~/interface/option";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event): Promise<ResponseAPI<CountResponse>> => {
        try {
            return {
                message: "Success Find Data Invoice",
                status: true,
                data: {
                    product: await prisma.products.count(),// i want per month
                    customer: await prisma.customers.count(),
                    invoice: await prisma.invoices.count({
                        where: {
                            createdAt: {
                                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Awal bulan ini}
                            }
                        },
                    }),
                }
            }
        } catch
            (e: unknown) {
            return responseError(e, event, 'Count is Error')
        }
    }
)