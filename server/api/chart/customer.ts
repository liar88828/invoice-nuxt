import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st

    return prisma.invoice_customers.groupBy({
        by: [ 'kota' ],
        where: {
            Invoices: {
                createdAt: {
                    gte: startOfYear, // Only data from this year
                },
            }
        },
        _count: { kota: true }, // Count users per city
    }).then((data) => {
        // console.log(data)
        return data.map(item => ({
                title: item.kota,
                count: item._count.kota,
            })
        )
    })
});

