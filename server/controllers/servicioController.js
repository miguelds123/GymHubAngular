const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los servicios
exports.getAllServicios = async (req, res, next) => {
    try {
        const servicios = await prisma.servicio.findMany();
        res.json(servicios);
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener un servicio por su ID
exports.getServicioById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const servicio = await prisma.servicio.findUnique({
            where: { id }
        });
        if (!servicio) {
            return res.status(404).json({ error: "Servicio no encontrado" });
        }
        res.json(servicio);
    } catch (error) {
        console.error("Error al obtener el servicio:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Crear un nuevo servicio
exports.createServicio = async (req, res, next) => {
    let body=req.body
    try {
        const nuevoServicio = await prisma.servicio.create({
            data: {
                nombre : body.nombre,
                descripcion : body.descripcion,
                tarifa : body.tarifa,
                tiempo : body.tiempo,
                equipamientoNecesario : body.equipamientoNecesario,
                nivelDificultad : body.nivelDificultad,
                imagen : body.imagen
            }
        });
        res.json(nuevoServicio)
    } catch (error) {
        console.error("Error al crear el servicio:", error);
    }
};

// Actualizar un servicio existente
exports.updateServicio = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, tarifa, tiempo, equipamientoNecesario, nivelDificultad } = req.body;
    try {
        const servicioActualizado = await prisma.servicio.update({
            where: { id },
            data: {
                nombre,
                descripcion,
                tarifa,
                tiempo,
                equipamientoNecesario,
                nivelDificultad
            }
        });
        res.json(servicioActualizado);
    } catch (error) {
        console.error("Error al actualizar el servicio:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Eliminar un servicio por su ID
exports.deleteServicio = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.servicio.delete({
            where: { id }
        });
        res.status(204).end();
    } catch (error) {
        console.error("Error al eliminar el servicio:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
