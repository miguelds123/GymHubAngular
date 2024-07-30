const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener un usuario por su correo electrónico

router.get('/email/:email', usuarioController.getUsuarioByEmail);
router.get('/', usuarioController.obtenerTodosEncargados);
router.put('/asignar',usuarioController.asignarSucursal);
router.put('/liberar/:id', usuarioController.liberarEncargado);

module.exports = router;

