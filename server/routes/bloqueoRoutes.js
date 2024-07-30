const express = require('express');
const router = express.Router();
const bloqueoController = require('../controllers/bloqueosController');

// Obtener todos los servicios
router.get('/:id', bloqueoController.getAllBloqueos);

// Crear un nuevo servicio
router.post('/', bloqueoController.createBloqueos);

// Actualizar un servicio existente
router.put('/:id', bloqueoController.updatebloqueo);

// Eliminar un servicio por su ID
router.delete('/:id', bloqueoController.deletebloqueo);

module.exports = router;