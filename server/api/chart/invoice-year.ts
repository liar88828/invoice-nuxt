import type { ResponseChartType } from "~/interface/chart";
import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1); // First day of the year

    const invoices = await prisma.invoices.findMany({
        where: {
            tanggal_invoice: {
                gte: startOfYear, // Filter only invoices from this year
            },
        },
        select: {
            tanggal_invoice: true,
            total: true,
        },
        orderBy: {
            tanggal_invoice: 'asc',
        },
    });

    // Function to get the start date of the week (Monday as the first day)
    function getWeekStart(date: Date): string {
        const day = date.getDay(); // Sunday = 0, Monday = 1, etc.
        const diff = day === 0 ? -6 : 1 - day; // Adjust so Monday is the first day
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() + diff);
        return weekStart.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    }

    // Group totals by week
    const weeklyTotals = invoices.reduce((acc, invoice) => {
        const weekStart = getWeekStart(new Date(invoice.tanggal_invoice));

        if (!acc[weekStart]) {
            acc[weekStart] = 0;
        }
        acc[weekStart] += invoice.total;

        return acc;
    }, {} as Record<string, number>);
    // Convert grouped data into an array
    return Object.entries(weeklyTotals).map(([ week, total ]) => ({
        week,
        total,
    }))
    .map((item): ResponseChartType => ({
        title: item.week,
        count: Number(item.total)
    }))

});
