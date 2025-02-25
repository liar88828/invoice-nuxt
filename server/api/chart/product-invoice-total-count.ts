import prisma from "~/lib/prisma";
import type { ResponseChartType } from "~/interface/chart";

export default defineEventHandler(async () => {
    return prisma.invoice_products.groupBy({
        by: [ 'nama' ],
        _sum: { jumlah: true }, // Sum 'jumlah' per product name
    }).then((data) => {
        return data.map((item): ResponseChartType => ({
            title: item.nama,
            count: item._sum.jumlah || 0, // Ensure count is always a number
        }));
    });
});
