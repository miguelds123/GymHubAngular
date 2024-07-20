const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

// Obtener todos los servicios
router.get('/', horarioController.getAllHorarios);

// Obtener un servicio por su ID
router.get('/:id', horarioController.getHorarioById);

// Crear un nuevo servicio
router.post('/', horarioController.createHorario);

// Actualizar un servicio existente
router.put('/:id', horarioController.updatehorario);

// Eliminar un servicio por su ID
router.delete('/:id', horarioController.deletehorario);

module.exports = router;