-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoice" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "tlp" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "invoice_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_invoice" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "productsId_produk" INTEGER NOT NULL,
    "invoicesId" INTEGER NOT NULL,
    CONSTRAINT "invoice_product_productsId_produk_fkey" FOREIGN KEY ("productsId_produk") REFERENCES "products" ("id_produk") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "invoice_product_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "invoices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tanggal_invoice" DATETIME NOT NULL,
    "ongkir" DECIMAL NOT NULL,
    "discount" DECIMAL NOT NULL,
    "total" DECIMAL NOT NULL,
    "notes" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "uang_muka" DECIMAL NOT NULL,
    "id_customers" INTEGER,
    "customersId" INTEGER NOT NULL,
    CONSTRAINT "invoices_customersId_fkey" FOREIGN KEY ("customersId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products" (
    "id_produk" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_produk" TEXT NOT NULL,
    "keterangan_produk" TEXT NOT NULL,
    "harga_produk" INTEGER,
    "jumlah_produk" INTEGER
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
