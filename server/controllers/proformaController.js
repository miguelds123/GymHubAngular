// controllers/citaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { startOfDay, endOfDay } = require('date-fns');
const ENCARGADO_ID = 3; // ID del encargado que se quiere consultar
// Obtener información completa de la(s) reserva(s) con opción de filtrar por cliente (usuarioId) y/o fecha



exports.getProformaEncargado = async (req, res, next) => {
    // Extraer el id del objeto `req.params`
    const encargadoId = parseInt(req.params.id, 10);

    // Obtener el sucursalId del usuario especificado
    const usuario = await prisma.usuario.findUnique({
        where: { id: encargadoId },
        select: { sucursalId: true }
    });

    console.log('Encargado ID recibido:', encargadoId);

    try {
        const proforma = await prisma.proforma.findMany({
            where: {
                sucursalId: usuario.sucursalId // Usa el número directamente aquí
            },
            include: {
                sucursal: true,
                cliente: true,
                servicio: true,
            },
        });

        if (proforma.length === 0) {
            return res.status(404).json({ error: 'No se encontraron proformas para este encargado.' });
        }

        res.json(proforma);
    } catch (error) {
        console.error('Error al obtener las citas del encargado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
exports.getProformaById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        const proforma = await prisma.proforma.findUnique({
            where: { id },
            include: {
                sucursal: true,
                cliente: true,
                servicio: true,
            },
        });

        res.json(proforma);
    } catch (error) {
        console.error("Error al obtener la cita:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
