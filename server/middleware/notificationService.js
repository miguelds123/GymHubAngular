// notificationService.js
const { getClientAppointments } = require('./appointmentService');
const { sendEmail } = require('./emailService');

const sendNotification = async () => {
    try {
        const appointments = await getClientAppointments();

        const today = new Date();

        function isSameDay(date1, date2) {
            return date1.getFullYear() === date2.getFullYear() &&
                   date1.getMonth() === date2.getMonth() &&
                   date1.getUTCDate() === date2.getUTCDate();
        }
        
        appointments.forEach(appointment => {
            const notificationDate = new Date(appointment.fecha);
            notificationDate.setDate(notificationDate.getDate() - 1);
            console.log(appointment.fecha, appointment.objetivoEntrenamiento)

            if (isSameDay(today, notificationDate)) {
                sendEmail(
                    appointment.usuario.email, 
                    'Recordatorio de cita', 
                    `Recuerde que tiene una cita programada para mañana a las ${appointment.horaInicio.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}, para el servicio ${appointment.servicio.nombre}, en la sucursal ${appointment.sucursal.nombre}`
                );
            }
            else{
                console.log("Nel")
            }
        });
    } catch (error) {
        console.error('Error al enviar notificaciones:', error);
    }
};

module.exports = {
    sendNotification
};