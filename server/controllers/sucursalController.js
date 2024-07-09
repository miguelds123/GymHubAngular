const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

