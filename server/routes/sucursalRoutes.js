const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');

// Obtener citas por sucursal
router.get('/', sucursalController.getAllSucursales);
router.post('/', sucursalController.createSucursal);
router.put('/:id', sucursalController.updateSucursal);
router.get('/:id', sucursalController.getSucursalById);
router.delete('/:id', sucursalController.deleteSucursal);
router.get('/:idUsuario', sucursalController.getCitasByUserId);
router.get('/usuario/:idUsuario', sucursalController.getSucursalByUserId);
router.get('/sucursal/:id', sucursalController.getCitasPorSucursal);
router.get('/encargado/disponibles', sucursalController.obtenerSucursalesDisponibles);
module.exports = router;