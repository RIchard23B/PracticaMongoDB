/*

Ruta: /api/producto

*/

const { Router } = require('express');
const { check  } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { agregarProducto, listarProducto, busquedaProducto, actualizarProducto, eliminarProcuto, } = require('../controllers/producto.controller');
const { validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

//RUTAS
router.get('/', listarProducto);
router.post('/',validarJWT, 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('sku', 'El sku es obligatorio').not().isEmpty(),
        validarCampos,
    ],agregarProducto);

router.get('/:busqueda', busquedaProducto);

router.put('/:id', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('stock', 'El stock es obligatorio').not().isEmpty(),
        validarCampos,
    ],actualizarProducto);

router.delete('/:id', eliminarProcuto);


module.exports = router;