/*

Ruta: /api/clientes

*/

const { Router } = require('express');
const { check  } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getListaClientes, crearCliente, leerCliente, actualizarCliente, eliminarCliente } = require('../controllers/cliente.controller');
const { validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

//RUTAS
router.get('/', validarJWT,getListaClientes);

router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').exists().not().isEmpty(),
        check('apellido', 'El apellido de obligatorio').exists().not().isEmpty(),
        check('email','El email es obligatorio').exists().isEmail(),
        validarCampos,
    ],
    crearCliente);

router.get('/:busqueda', validarJWT,leerCliente);

router.put('/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').exists().not().isEmpty(),
        check('apellido', 'El apellido de obligatorio').exists().not().isEmpty(),
        check('email', 'El email es obligatorio').exists().isEmail(),

        validarCampos,
    ], actualizarCliente)

router.delete('/:id', validarJWT, eliminarCliente);

module.exports = router;