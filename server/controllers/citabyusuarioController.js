const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener citas por sucursal

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

