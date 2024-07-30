const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioDetailController');

// Obtener un servicio por su ID
router.get('/:id', horarioController.getHorarioById);

module.exports = router;