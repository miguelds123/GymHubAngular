const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener un usuario por su correo electrónico

router.get("/usuarioFactura/:idEncargadoId", usuarioController.usuarioConFacturasSucursal)
router.get('/email/:email', usuarioController.getUsuarioByEmail);
router.get('/', usuarioController.obtenerTodosEncargados);
router.get("/all", usuarioController.getAllUsuarios)
router.put('/asignar',usuarioController.asignarSucursal);
router.get("/:id", usuarioController.getUsuarioById);
router.get('/cliente/usuario', usuarioController.getAllUsuariosClientes);
router.put('/liberar/:id', usuarioController.liberarEncargado);
router.post("/login", usuarioController.login);
router.post("/registrar", usuarioController.register);


module.exports = router;

