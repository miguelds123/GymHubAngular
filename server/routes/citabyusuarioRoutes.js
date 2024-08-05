const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/citabyusuarioController');

// Obtener citas por sucursal
router.get('/:idUsuario', sucursalController.getCitasByUserId);
module.exports = router;