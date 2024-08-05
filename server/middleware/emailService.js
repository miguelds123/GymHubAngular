// emailService.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Configurar el transporte
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Tu contraseña de correo
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Función para enviar correos electrónicos
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'michiprogramador12@gmail.com', // Tu correo electrónico
        to, // Destinatario
        subject, // Asunto del correo
        text // Contenido del correo
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado:', info.response);
        }
    });
};

module.exports = {
    sendEmail
};