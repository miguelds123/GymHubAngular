/*
  Warnings:

  - You are about to drop the column `horarioId` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the column `diaSemana` on the `horario` table. All the data in the column will be lost.
  - Added the required column `condicionesMedicas` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelExperiencia` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivoEntrenamiento` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Factura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `Cita_horarioId_fkey`;

-- AlterTable
ALTER TABLE `cita` DROP COLUMN `horarioId`,
    ADD COLUMN `condicionesMedicas` VARCHAR(191) NOT NULL,
    ADD COLUMN `nivelExperiencia` VARCHAR(191) NOT NULL,
    ADD COLUMN `objetivoEntrenamiento` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `factura` ADD COLUMN `estado` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `horario` DROP COLUMN `diaSemana`,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL;
