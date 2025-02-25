import prisma from "~/lib/prisma";
import type { ResponseChartType } from "~/interface/chart";
import { toDate } from "~/utils/toDate";

export default defineEventHandler(async () => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30); // Start from today - 30 days

    // Fetch data grouped by day
    return prisma.invoices.groupBy({

        by: [ 'tanggal_invoice' ],
        where: {
            status:"Selesai",
            tanggal_invoice: {
                gte: startDate, // Only invoices from the last 30 days
            },
        },
        _sum: {
            total: true,
        },
        orderBy: {
            tanggal_invoice: 'asc',
        },
    }).then(data => data.map((item): ResponseChartType => ({
        title: toDate(item.tanggal_invoice),
        count: Number(item._sum.total),
    })))

});
