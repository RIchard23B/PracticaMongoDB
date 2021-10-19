/*

Ruta: /api/order

*/

const { Router } = require('express');
const { check  } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { listaOrder, registrarOrder, buscarOrden, actualizarOrden, eliminarOrden } = require('../controllers/order.controller');
const { validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

//RUTAS
router.get('/', listaOrder);

router.post('/', 
    [
        validarJWT, 
        check('cliente', 'El cliente es obligatorio').not().isEmpty(),
        check('productos', 'Los Productos es obligatorio').not().isEmpty(),
        validarCampos,
    ],registrarOrder);

router.get('/:id',validarJWT,buscarOrden);

router.put('/:id',
    [
        validarJWT, 
        check('cliente', 'El cliente es obligatorio').not().isEmpty(),
        check('productos', 'Los Productos es obligatorio').not().isEmpty(),
        check('MontoTotal', 'El Monto Total es obligatorio').not().isEmpty(),
        validarCampos,
    ],actualizarOrden);

router.delete('/:id',eliminarOrden);

//router.get('/:id',buscarOrdenCliente);


module.exports = router;