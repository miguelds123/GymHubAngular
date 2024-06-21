const express=require('express');
const router= express.Router();

//Controlador
const facturaController=require('../controllers/facturaController')
//Rutas

router.post("/", facturaController.create);

router.get('/:id',facturaController.getById) 


module.exports=router