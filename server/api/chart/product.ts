import prisma from "~/lib/prisma";
import type { ResponseChartType } from "~/interface/chart";

export default defineEventHandler(async () => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st
    return await prisma.invoice_products.groupBy({
        by: [ 'nama' ], // Group by product name
        where: {
            Invoices: {
                createdAt: {
                    gte: startOfYear, // Only data from this year
                },
            }
        },
        _count: { nama: true }, // Count occurrences
    }).then(data => data.map((item): ResponseChartType => ({
            title: item.nama,
            count: item._count.nama,
        }

    )))
});
