// routes/reserva.js

const express = require('express');
const router = express.Router();
const citaController=require('../controllers/citaController')

// Ruta para obtener la información completa de la reserva por ID de cita
router.get('/', citaController.getCitas);
router.get('/:id', citaController.getCitaById);
router.post('/crear', citaController.createCita);
router.get('/encargado/citas/:id', citaController.getCitasEncargado);
module.exports = router;
