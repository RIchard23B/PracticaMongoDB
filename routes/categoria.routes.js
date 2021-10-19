/*

Ruta: /api/Categoria

*/

const { Router } = require('express');
const { check  } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const { agregarCategoria, listarCategoria, buscarCategoria, eliminarCategoria, actualizarCategoria } = require('../controllers/categoria.controller');

const router = Router();

//RUTAS
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],agregarCategoria);

router.get('/',validarJWT,listarCategoria);

router.get('/:busqueda',validarJWT,buscarCategoria);


router.put('/:id',validarJWT,
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],actualizarCategoria);

router.delete('/:id',validarJWT,eliminarCategoria)

module.exports = router;