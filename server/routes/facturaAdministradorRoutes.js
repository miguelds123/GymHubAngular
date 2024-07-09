const express=require('express');
const router= express.Router();

//Controlador
const facturaAdministradorController=require('../controllers/facturaAdministradorController')
//Rutas

router.get('/:id',facturaAdministradorController.get)


module.exports=router
