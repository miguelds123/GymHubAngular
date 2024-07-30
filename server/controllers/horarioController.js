const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los horarios
exports.getAllHorarios = async (req, res, next) => {
    let idSucursal = parseInt(req.params.id);
    try {
        const horario = await prisma.horario.findMany({
            include: {
                sucursal: true
            },
            where: {
                sucursalId : idSucursal
            }
        });
        res.json(horario);
    } catch (error) {
        console.error("Error al obtener los horarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear un nuevo horario
exports.createHorario = async (req, res, next) => {
    const { sucursalId, diaSemana, fecha, horaInicio, horaFin} = req.body;
    try {
        const nuevohorario = await prisma.horario.create({
            data: {
                sucursalId,
                diaSemana,
                fecha,
                horaInicio,
                horaFin,
            }
        });
        res.status(201).json(nuevohorario);
    } catch (error) {
        console.error("Error al crear el horario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Actualizar un horario existente
exports.updatehorario = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { sucursalId, diaSemana, fecha, horaInicio, horaFin } = req.body;
    try {
        const horarioActualizado = await prisma.producto.update({
            where: { id },
            data: {
                sucursalId,
                diaSemana,
                fecha,
                horaInicio,
                horaFin,
            }
        });
        res.json(horarioActualizado);
    } catch (error) {
        console.error("Error al actualizar el horario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un horario por su ID
exports.deletehorario = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.horario.delete({
            where: { id }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar el horario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
