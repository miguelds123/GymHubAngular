/*
  Warnings:

  - You are about to drop the `horariosemana` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `horariosemana` DROP FOREIGN KEY `HorarioSemana_idHorarioDia_fkey`;

-- DropTable
DROP TABLE `horariosemana`;

-- CreateTable
CREATE TABLE `SemanaHorario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horarioId` INTEGER NOT NULL,

    UNIQUE INDEX `SemanaHorario_horarioId_key`(`horarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SemanaHorario` ADD CONSTRAINT `SemanaHorario_horarioId_fkey` FOREIGN KEY (`horarioId`) REFERENCES `Horario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
