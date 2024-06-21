/*
  Warnings:

  - You are about to drop the `detallefactura` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detallefactura` DROP FOREIGN KEY `DetalleFactura_facturaId_fkey`;

-- DropForeignKey
ALTER TABLE `detallefactura` DROP FOREIGN KEY `DetalleFactura_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `detallefactura` DROP FOREIGN KEY `DetalleFactura_servicioId_fkey`;

-- DropTable
DROP TABLE `detallefactura`;

-- CreateTable
CREATE TABLE `DetalleFacturaProductos` (
    `facturaId` INTEGER NOT NULL,
    `idDetalle` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`facturaId`, `idDetalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleFacturaServicios` (
    `facturaId` INTEGER NOT NULL,
    `idDetalle` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`facturaId`, `idDetalle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetalleFacturaProductos` ADD CONSTRAINT `DetalleFacturaProductos_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFacturaProductos` ADD CONSTRAINT `DetalleFacturaProductos_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFacturaServicios` ADD CONSTRAINT `DetalleFacturaServicios_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFacturaServicios` ADD CONSTRAINT `DetalleFacturaServicios_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
