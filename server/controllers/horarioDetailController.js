const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener un horario por su ID
exports.getHorarioById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const horario = await prisma.horario.findUnique({
            where: { id },
            include: {sucursal:true}
        });
        if (!horario) {
            return res.status(404).json({ error: "Horario no encontrado" });
        }
        res.json(horario);
    } catch (error) {
        console.error("Error al obtener el horario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
