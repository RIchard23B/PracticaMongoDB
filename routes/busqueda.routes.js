/*
    path: api/todo/busqueda
*/


const { Router } = require('express');
const { busquedaTotal } = require('../controllers/busqueda.controller');
const { validarJWT } = require ('../middlewares/validar-jwt');


const router = Router();

router.get( '/:busqueda', validarJWT,busquedaTotal );
//router.get( '/coleccion/:micoleccion/:busqueda', validarJWT ,busquedaColeccion );


module.exports = router;