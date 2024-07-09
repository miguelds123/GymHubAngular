const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener información completa de la reserva por ID de cita
exports.getInformacionReserva = async (req, res, next) => {
    const idCita = parseInt(req.params.idCita); // Obtener el ID de la cita desde los parámetros

    try {
        const reserva = await prisma.cita.findUnique({
            where: { id: idCita },
            include: {
                sucursal: true,
                usuario: true,
                servicio: true,
            },
        });

        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        const { fecha, horaInicio, horaFin, estado, objetivoEntrenamiento, nivelExperiencia, condicionesMedicas } = reserva;

        const informacionReserva = {
            fecha,
            horaInicio,
            horaFin,
            sucursal: reserva.sucursal.nombre,
            servicio: reserva.servicio.nombre,
            objetivoEntrenamiento,
            nivelExperiencia,
            condicionesMedicas,
            estado,
        };

        res.json(informacionReserva);
    } catch (error) {
        console.error('Error al obtener la información de la reserva:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Ejemplo de uso en una ruta:
// GET /reserva/:idCita
// Retorna toda la información de la reserva según el ID de la cita
