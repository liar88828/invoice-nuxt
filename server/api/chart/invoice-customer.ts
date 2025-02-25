import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
    return prisma.invoice_customers.groupBy({
        by: [ 'kota' ],
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

