const { response } = require('express');
const Producto = require('../models/producto.model');

//Agregar Producto
const agregarProducto = async(req, res=response)=>{

    try{

    //Creamos un obj de la clase model Cliente
    const producto = new Producto(req.body);

    //Indicar a monngoose que registre Producto a la BD
    await producto.save();

    res.json({
        ok: true,
        msg: 'Nuevo Producto agregado!!!!'
    });

    }catch( error ){
        if(error.code === 11000){
            res.status(400).json({
                ok: false,
                msg:  `Ya existe un producto con el SKU: ${req.body.sku}`
            });


        }else{
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error en el servidor, revisar logs'
            });
        }
        
    }

}

//Listar Productos
const listarProducto = async (req, res) =>{
    
    
    const producto = await Producto.find({});

    res.json({
        ok: true,
        producto
    });

}

//Busqueda Producto
const busquedaProducto = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [productos] = await Promise.all ([
        Producto.find({sku:miRegExp}), // la busqueda es por sku
    ]);

    res.json({
        ok: true,
        msg: 'busqueda Productos',
        productos
    });

}

//Actualizar Prodcuto
const actualizarProducto = async (req, res= response) =>{
    const uid = req.params.id;

    try{
        const productoDB = await Producto.findById(uid);
        if(!productoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con ese id'
            });
        }
        const {descripcion, precio, stock, disponibilidad,sku, ...campos} = req.body
        
        if(productoDB.sku !== sku){
            const existeSku = await Producto.findOne({sku});
            if(existeSku){
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe un producto con el SKU: ${req.body.sku}`
                });
            }
        }

        campos.sku = sku;
        //actualizacion de datos
        const productoActualizado = await Producto.findByIdAndUpdate(uid,campos, {new:true});

        res.json({
            ok:true,
            producto: productoActualizado
        });


    }catch(error) {
        console.log(error);
        if(error.code === 11000){
            res.status(400).json({
                ok: false,
                msg:  `Ya existe un producto con el SKU: ${req.body.sku}`
            });


        }else{
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error en el servidor, revisar logs'
            });
        }
    }
}

//Eliminar Cliente
const eliminarProcuto = async (req, res=response) =>{

    const uid = req.params.id;

    try{
        const productoDB = await Producto.findById(uid);
        if(!productoDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un producto con ese id'
            });
        }

        await Producto.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Producto eliminado de la BD'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar el Producto'
        });
    }
}


module.exports = {
    agregarProducto,
    listarProducto,
    busquedaProducto,
    actualizarProducto,
    eliminarProcuto,
}
