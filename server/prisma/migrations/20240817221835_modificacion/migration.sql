/*
  Warnings:

  - Added the required column `fechaRerserva` to the `proforma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_citaId_fkey`;

-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `proforma` DROP FOREIGN KEY `Proforma_sucursalId_fkey`;

-- AlterTable
ALTER TABLE `proforma` ADD COLUMN `fechaRerserva` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `proforma` ADD CONSTRAINT `proforma_citaId_fkey` FOREIGN KEY (`citaId`) REFERENCES `Cita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proforma` ADD CONSTRAINT `proforma_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proforma` ADD CONSTRAINT `proforma_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proforma` ADD CONSTRAINT `proforma_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `proforma_citaId_key` ON `proforma`(`citaId`);
DROP INDEX `Proforma_citaId_key` ON `proforma`;
