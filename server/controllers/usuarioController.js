const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Función para obtener un usuario por su correo electrónico
exports.getUsuarioByEmail = async (req, res, next) => {
    const email = req.params.email; // Suponiendo que el email se pasa como parámetro en la URL o cuerpo de la solicitud

    try {
        // Buscar al usuario por su correo electrónico
        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario); // Devolver el usuario encontrado
    } catch (error) {
        console.error('Error al obtener el usuario por correo electrónico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.obtenerTodosEncargados = async (req, res, next) => {
    console.log('entro');
    try {
        const encargados = await prisma.usuario.findMany({
            where: { role: 'ENCARGADO' },
            include: { Sucursal: true },
        });
      
        res.json(encargados);
    } catch (error) {
        console.error("Error al obtener los encargados:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Asignar una sucursal a un encargado
exports.asignarSucursal = async (req, res, next) => {
    const { idEncargado, idSucursal } = req.body;
    try {
        // Verificar que la sucursal no esté asignada a otro encargado
        const sucursalAsignada = await prisma.usuario.findFirst({
            where: { sucursalId: idSucursal },
        });
        if (sucursalAsignada) {
            return res.status(400).json({ error: "La sucursal ya está asignada a otro encargado" });
        }

        // Asignar la sucursal al encargado
        const encargadoActualizado = await prisma.usuario.update({
            where: { id: idEncargado },
            data: { sucursalId: idSucursal },
        });
        res.json(encargadoActualizado);
    } catch (error) {
        console.error("Error al asignar la sucursal:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Liberar un encargado de su sucursal
exports.liberarEncargado = async (req, res, next) => {
    const idEncargado = parseInt(req.params.id);
    try {
        const encargadoActualizado = await prisma.usuario.update({
            where: { id: idEncargado },
            data: { sucursalId: null },
        });
        res.json(encargadoActualizado);
    } catch (error) {
        console.error("Error al liberar al encargado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.usuarioConFacturasSucursal = async (req, res, next) => {
    let idEncargadoId = parseInt(req.params.idEncargadoId);

    // Obtener el sucursalId del usuario especificado
    const usuario = await prisma.usuario.findUnique({
        where: { id: idEncargadoId },
        select: { sucursalId: true }
    });

    if (!usuario || !usuario.sucursalId) {
        return response.status(404).json({ error: 'Usuario no encontrado o no tiene una sucursal asignada' });
    }

    console.log(idEncargadoId)
    try {
        const horario = await prisma.factura.findMany({
            include: {
               cliente : true
            },
            where: {
                sucursalId : usuario.sucursalId
            }
        });
        res.json(horario);
    } catch (error) {
        console.error("Error al obtener los horarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

exports.getAllUsuarios = async (req, res, next) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getUsuarioById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id },
            include: {
                Sucursal: true
            }
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};