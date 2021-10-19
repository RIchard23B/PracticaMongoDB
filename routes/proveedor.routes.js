/*

Ruta: /api/proveedor

*/

const { Router } = require('express');
const { check  } = require('express-validator');
const { agregarProveedor, listarProveedor, busquedaProveedor, actualizarProveedor, eliminarProveedor } = require('../controllers/proveedor.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

//RUTAS

router.post('/',
    [
        validarJWT,
        
        check('nomCompania','El nombre de la compañia es Obligatorio').not().notEmpty(),
        check('direccion','La dirección es Obligatorio').not().notEmpty(),
        check('codPostal','El codigo postal es obligatorio').not().notEmpty(),
        
        validarCampos,
    ],agregarProveedor);

router.get('/',validarJWT,listarProveedor);
router.get('/:busqueda',busquedaProveedor);
router.put('/:id', 
    [
        validarJWT,
        check('nomCompania', 'El nombre del proyecto es obligatorio').not().isEmpty(),
        validarCampos,
    ],actualizarProveedor);

router.delete('/:id',validarJWT,eliminarProveedor);

module.exports = router;