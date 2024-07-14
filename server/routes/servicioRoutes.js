const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

// Obtener todos los servicios
router.get('/', servicioController.getAllServicios);

// Obtener un servicio por su ID
router.get('/:id', servicioController.getServicioById);

// Crear un nuevo servicio
router.post('/', servicioController.createServicio);

// Actualizar un servicio existente
router.put('/:id', servicioController.updateServicio);

// Eliminar un servicio por su ID
router.delete('/:id', servicioController.deleteServicio);

module.exports = router;