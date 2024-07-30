const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los horarios
exports.getAllBloqueos = async (req, res, next) => {
    let idSucursal = parseInt(req.params.id);
    try {
        const horario = await prisma.horarioBloqueo.findMany({
            include: {
                sucursal: true
            },
            where: {
                sucursalId : idSucursal
            }
        });
        res.json(horario);
    } catch (error) {
        console.error("Error al obtener los bloqueos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear un nuevo horario
exports.createBloqueos = async (req, res, next) => {
    const { sucursalId, diaSemana, fecha, horaInicio, horaFin} = req.body;
    try {
        const nuevobloqueo = await prisma.horarioBloqueo.create({
            data: {
                sucursalId,
                diaSemana,
                fecha,
                horaInicio,
                horaFin,
            }
        });
        res.status(201).json(nuevobloqueo);
    } catch (error) {
        console.error("Error al crear el bloqueo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar un horario existente
exports.updatebloqueo = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { sucursalId, diaSemana, fecha, horaInicio, horaFin } = req.body;
    try {
        const bloqueoActualizado = await prisma.horarioBloqueo.update({
            where: { id },
            data: {
                sucursalId,
                diaSemana,
                fecha,
                horaInicio,
                horaFin,
            }
        });
        res.json(bloqueoActualizado);
    } catch (error) {
        console.error("Error al actualizar el bloqueo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un horario por su ID
exports.deletebloqueo = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.horarioBloqueo.delete({
            where: { id }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar el bloqueo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
