const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener citas por sucursal
exports.createSucursal = async (req, res, next) => {
    const { nombre, descripcion, telefono, direccion, email } = req.body;
    try {
        const nuevaSucursal = await prisma.sucursal.create({
            data: {
                nombre,
                descripcion,
                telefono,
                direccion,
                email
            }
        });
        res.status(201).json(nuevaSucursal);
    } catch (error) {
        console.error("Error al crear la sucursal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar una sucursal existente
exports.updateSucursal = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, telefono, direccion, email } = req.body;
    try {
        const sucursalActualizada = await prisma.sucursal.update({
            where: { id },
            data: {
                nombre,
                descripcion,
                telefono,
                direccion,
                email
            }
        });
        res.json(sucursalActualizada);
    } catch (error) {
        console.error("Error al actualizar la sucursal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar una sucursal por su ID
exports.deleteSucursal = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.sucursal.delete({
            where: { id }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar la sucursal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener todas las sucursales
exports.getAllSucursales = async (req, res, next) => {
    try {
        const sucursales = await prisma.sucursal.findMany();
        res.json(sucursales);
    } catch (error) {
        console.error("Error al obtener las sucursales:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener citas por sucursal
exports.getCitasPorSucursal = async (req, res, next) => {
    const idSucursal = parseInt(req.params.id);

    try {
        const citas = await prisma.cita.findMany({
            where: {
                sucursalId: idSucursal
            },
            include: {
                usuario: true,
                servicio: true
            },
            orderBy: {
                fecha: 'asc'
            }
        });

        res.json(citas);
    } catch (error) {
        console.error("Error al obtener las citas por sucursal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


exports.getSucursalByUserId = async (req, res, next) => {
    const idUsuario = parseInt(req.params.idUsuario);

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: idUsuario },
            include: { Sucursal: true } // Incluir relación con Sucursal
        });

        if (!usuario || !usuario.Sucursal) {
            return res.status(404).json({ error: 'Usuario no encontrado o sin sucursal asignada' });
        }

        res.json(usuario.Sucursal);
    } catch (error) {
        console.error('Error al obtener la sucursal del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getCitasByUserId = async (req, res, next) => {
    const idUsuario = parseInt(req.params.idUsuario);

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: idUsuario },
            include: {
                Sucursal: {
                    include: {
                        citas: {
                            include: {
                                usuario: true,
                                servicio: true
                            }
                        } // Incluir las citas relacionadas con la sucursal
                        
                    }
                }
            }
        });

        if (!usuario || !usuario.Sucursal) {
            return res.status(404).json({ error: 'Usuario no encontrado o sin sucursal asignada' });
        }

        res.json({
            sucursal: usuario.Sucursal,
            citas: usuario.Sucursal.citas
        });
    } catch (error) {
        console.error('Error al obtener las citas del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

exports.obtenerSucursalesDisponibles = async (req, res, next) => {
    try {
        const sucursales = await prisma.sucursal.findMany({
            where: { Usuario: { none: {} } } // Sucursales sin encargados asignados
        });
        res.json(sucursales);
    } catch (error) {
        console.error("Error al obtener las sucursales disponibles:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getSucursalById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        // Suponiendo que usas un cliente de base de datos similar a Prisma
        const sucursal = await prisma.sucursal.findUnique({
            where: { id }
        });
        if (!sucursal) {
            return res.status(404).json({ error: "Sucursal no encontrada" });
        }
        res.json(sucursal);
    } catch (error) {
        console.error("Error al obtener la sucursal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

