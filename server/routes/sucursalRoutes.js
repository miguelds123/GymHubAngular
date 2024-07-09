const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// Obtener citas por sucursal
router.get('/:idUsuario', sucursalController.getCitasByUserId);
router.get('/usuario/:idUsuario', sucursalController.getSucursalByUserId);
router.get('/sucursal/:id', sucursalController.getCitasPorSucursal);
module.exports = router;