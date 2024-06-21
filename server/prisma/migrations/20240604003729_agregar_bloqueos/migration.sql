/*
  Warnings:

  - You are about to drop the `horario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `semanahorario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `horario` DROP FOREIGN KEY `Horario_sucursalId_fkey`;

-- DropForeignKey
ALTER TABLE `semanahorario` DROP FOREIGN KEY `SemanaHorario_horarioId_fkey`;

-- DropTable
DROP TABLE `horario`;

-- DropTable
DROP TABLE `semanahorario`;

-- CreateTable
CREATE TABLE `HorarioBloqueo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sucursalId` INTEGER NOT NULL,
    `diaSemana` ENUM('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo') NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `horaInicio` DATETIME(3) NOT NULL,
    `horaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HorarioBloqueo` ADD CONSTRAINT `HorarioBloqueo_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
