const express=require('express');
const router= express.Router();

//Controlador
const proformaController=require('../controllers/proformaController')
//Rutas

router.get('/:id',proformaController.getProformaEncargado);

router.get("/detail/:id", proformaController.getProformaById)



module.exports=router
