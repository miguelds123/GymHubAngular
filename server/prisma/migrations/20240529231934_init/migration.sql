-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('CLIENTE', 'ENCARGADO', 'ADMINISTRADOR') NOT NULL DEFAULT 'CLIENTE',
    `sucursalId` INTEGER NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `tarifa` DECIMAL(10, 2) NOT NULL,
    `tiempo` INTEGER NOT NULL,
    `campoExtra1` VARCHAR(191) NOT NULL,
    `campoExtra2` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `campoExtra1` VARCHAR(191) NOT NULL,
    `campoExtra2` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sucursalId` INTEGER NOT NULL,
    `diaSemana` INTEGER NOT NULL,
    `horaInicio` DATETIME(3) NOT NULL,
    `horaFin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `horaInicio` DATETIME(3) NOT NULL,
    `horaFin` DATETIME(3) NOT NULL,
    `estado` ENUM('PENDIENTE', 'CONFIRMADA', 'REPROGRAMADA', 'COMPLETADA', 'CANCELADA', 'NO_ASISTIO') NOT NULL DEFAULT 'PENDIENTE',
    `sucursalId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `servicioId` INTEGER NOT NULL,
    `encargadoId` INTEGER NOT NULL,  -- Añadido el campo para el ID del encargado
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `horarioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- CreateTable
CREATE TABLE `Factura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `sucursalId` INTEGER NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleFactura` (
    `facturaId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`facturaId`, `productoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_horarioId_fkey` FOREIGN KEY (`horarioId`) REFERENCES `Horario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_facturaId_fkey` FOREIGN KEY (`facturaId`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
