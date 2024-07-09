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

// Otras funciones del controlador para actualizar, eliminar, etc.
