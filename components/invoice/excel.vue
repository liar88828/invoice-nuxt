<template>
    <div>
        <button @click="exportToExcel"
                class="btn btn-success">
            Export to Excel
        </button>
    </div>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx';
import type { InvoiceProductCustomer } from "~/schema/invoice";
import { toDate } from "~/utils/toDate";

const props = defineProps<{ invoiceData: InvoiceProductCustomer[] }>()

// Method to export to Excel

// Method to export to Excel
const exportToExcel = () => {
    const invoiceData = props.invoiceData;

    // Simplify and flatten the data for the main invoices
    const invoiceInfo = invoiceData.map(invoice => ({
        id: invoice.id,
        tanggal_invoice: invoice.tanggal_invoice,
        ongkir: invoice.ongkir,
        discount: invoice.discount,
        total: invoice.total,
        notes: invoice.notes,
        status: invoice.status,
        uang_muka: invoice.uang_muka,
        createdAt: invoice.createdAt,
        customer_nama: invoice.Invoice_customers?.nama,
        customer_alamat: invoice.Invoice_customers?.alamat,
        customer_kota: invoice.Invoice_customers?.kota,
        customer_tlp: invoice.Invoice_customers?.tlp,
        product_nama: invoice.Invoice_products?.map(item => item.nama).join(', ') || "",
        product_total: invoice.Invoice_products?.reduce((sum, item) => sum + (item.jumlah * item.harga), 0) || 0
    }));

    // Flatten the products data (assuming all invoices have products)
    const products = invoiceData.flatMap(({ Invoice_products }) =>
        Invoice_products.map((productItem) => ({
            product_id: productItem.id,
            product_nama: productItem.nama,
            product_keterangan: productItem.keterangan,
            product_harga: productItem.harga,
            product_jumlah: productItem.jumlah,
            product_total: productItem.harga * productItem.jumlah,
            product_local_id: productItem.productsId,
            product_invoice_id: productItem.invoicesId,
        }))
    );

    // Create a worksheet for the invoice information
    const wsInvoice = XLSX.utils.json_to_sheet(invoiceInfo);

    // Create a worksheet for the products information
    const wsProducts = XLSX.utils.json_to_sheet(products);

    // Set column widths to make the 'id' column wider (and others if needed)
    wsInvoice['!cols'] = [
        { wpx: 50 },  // id column width (adjust this value to make it wider or shorter)
        { wpx: 100 },  // Other columns, adjust as necessary
        { wpx: 50 },
        { wpx: 50 },
        { wpx: 50 },
        { wpx: 150 },
        { wpx: 70 },
        { wpx: 50 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
    ];

    // Optionally adjust the columns in the products sheet as well
    wsProducts['!cols'] = [
        { wpx: 50 }, // product_id column width
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
        { wpx: 200 },
    ];

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append the worksheets to the workbook
    XLSX.utils.book_append_sheet(wb, wsInvoice, 'Invoice Info');
    XLSX.utils.book_append_sheet(wb, wsProducts, 'Products');

    // Export the workbook to an Excel file
    XLSX.writeFile(wb, `Invoice_Data_${ toDate(new Date()) }.xlsx`);
}
</script>
