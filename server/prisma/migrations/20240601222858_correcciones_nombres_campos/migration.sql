/*
  Warnings:

  - The primary key for the `detallefactura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `campoExtra1` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `campoExtra2` on the `producto` table. All the data in the column will be lost.
  - You are about to drop the column `campoExtra1` on the `servicio` table. All the data in the column will be lost.
  - You are about to drop the column `campoExtra2` on the `servicio` table. All the data in the column will be lost.
  - Added the required column `idDetalle` to the `DetalleFactura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicioId` to the `DetalleFactura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipamientoNecesario` to the `Servicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelDificultad` to the `Servicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detallefactura` DROP PRIMARY KEY,
    ADD COLUMN `idDetalle` INTEGER NOT NULL,
    ADD COLUMN `servicioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`facturaId`, `idDetalle`);

-- AlterTable
ALTER TABLE `producto` DROP COLUMN `campoExtra1`,
    DROP COLUMN `campoExtra2`,
    ADD COLUMN `marca` VARCHAR(191) NOT NULL,
    ADD COLUMN `peso` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `servicio` DROP COLUMN `campoExtra1`,
    DROP COLUMN `campoExtra2`,
    ADD COLUMN `equipamientoNecesario` VARCHAR(191) NOT NULL,
    ADD COLUMN `nivelDificultad` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
