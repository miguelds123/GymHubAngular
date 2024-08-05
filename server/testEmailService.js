const express = require('express');
const cron = require('node-cron');
const { sendEmail } = require('./middleware/emailService'); // Asegúrate de tener esto configurado correctamente

const app = express();

// Configurar cron job para ejecutarse cada minuto para pruebas
cron.schedule('* * * * *', () => {
    console.log('Ejecutando tarea programada...');
    try{
        sendEmail("mdsantamaria02@gmail.com", 'Recordatorio de cita', "Recuerde que tiene una cita programada para mañana a las");
        console.log("Ejecutando tarea programada")
    }
    catch (error){
        console.log(error)
    }
    
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});