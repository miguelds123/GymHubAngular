const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos los productos
router.get('/', productoController.getAllProductos);

// Obtener un producto por su ID
router.get('/:id', productoController.getProductoById);

// Crear un nuevo producto
router.post('/', productoController.createProducto);

// Actualizar un producto existente
router.put('/:id', productoController.updateProducto);

// Eliminar un producto por su ID
router.delete('/:id', productoController.deleteProducto);

module.exports = router;