-- CreateTable
CREATE TABLE `HorarioSemana` (
    `idSemana` INTEGER NOT NULL,
    `idHorarioDia` INTEGER NOT NULL,

    PRIMARY KEY (`idSemana`, `idHorarioDia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HorarioSemana` ADD CONSTRAINT `HorarioSemana_idHorarioDia_fkey` FOREIGN KEY (`idHorarioDia`) REFERENCES `Horario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
