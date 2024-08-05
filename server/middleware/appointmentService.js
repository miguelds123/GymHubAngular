const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getClientAppointments = async () => {
    try {
        const appointments = await prisma.cita.findMany({
            include: {
                usuario: true,
                servicio: true,
                sucursal:true
            }
        });
        return appointments;
    } catch (error) {
        console.error('Error al obtener citas:', error);
        throw error;
    }
};

module.exports = {
    getClientAppointments
};