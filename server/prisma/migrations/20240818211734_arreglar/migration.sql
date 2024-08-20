/*
  Warnings:

  - You are about to drop the `proforma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_citaId_fkey`;

-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_sucursalId_fkey`;

-- DropTable
DROP TABLE `proforma`;
