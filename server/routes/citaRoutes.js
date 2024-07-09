// routes/reserva.js

const express = require('express');
const router = express.Router();
const citaController=require('../controllers/citaController')

// Ruta para obtener la información completa de la reserva por ID de cita
router.get('/:idCita', citaController.getInformacionReserva);

module.exports = router;
