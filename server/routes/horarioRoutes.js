const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

// Obtener todos los servicios
router.get('/:id', horarioController.getAllHorarios);

// Crear un nuevo servicio
router.post('/', horarioController.createHorario);

// Actualizar un servicio existente
router.put('/:id', horarioController.updatehorario);

// Eliminar un servicio por su ID
router.delete('/:id', horarioController.deletehorario);

module.exports = router;