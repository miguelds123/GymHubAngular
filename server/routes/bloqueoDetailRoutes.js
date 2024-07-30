const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/bloqueoDetailController');

// Obtener un servicio por su ID
router.get('/:id', horarioController.getBloqueoById);

module.exports = router;