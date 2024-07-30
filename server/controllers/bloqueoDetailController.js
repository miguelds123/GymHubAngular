const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener un horario por su ID
exports.getBloqueoById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const horario = await prisma.horarioBloqueo.findUnique({
            where: { id },
            include: {sucursal:true}
        });
        if (!horario) {
            return res.status(404).json({ error: "Bloqueo no encontrado" });
        }
        res.json(horario);
    } catch (error) {
        console.error("Error al obtener el bloqueo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
