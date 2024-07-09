const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener un usuario por su correo electrónico
router.get('/email/:email', usuarioController.getUsuarioByEmail);

// Otras rutas para actualizar, eliminar, etc.

module.exports = router;
