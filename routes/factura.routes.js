/*

Ruta: /api/producto

*/

const { Router } = require('express');
const { check  } = require('express-validator');
const { agregarFactura, listarFactura, busquedaFactura, actualizarFactura, eliminarFactura } = require('../controllers/factura.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

//RUTAS
router.post('/', 
    [
        validarJWT,
        check('order', 'El id de orden es obligatorio').isMongoId(),
        check('usuario', 'El id del usuario es obligatorio').isMongoId(),
        check('cliente', 'El id de cliente es obligatorio').isMongoId(),
        validarCampos,
        
    ],agregarFactura);

router.get('/', validarJWT,listarFactura);
router.get('/:busqueda',validarJWT,busquedaFactura);
router.put('/:id', 
    [
        validarJWT,
        check('nfactura', 'El N° de Factura debe ser obligatorio').not().isEmpty(),
        validarCampos,
    ],actualizarFactura);
router.delete('/:id', eliminarFactura);


module.exports = router;