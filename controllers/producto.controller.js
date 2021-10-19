const { response, query } = require('express');
const Producto = require('../models/producto.model');

//Agregar Producto
const agregarProducto = async(req, res=response)=>{

    const uid = req.uid;
    const xid =req.uid;
    

    //Creamos un obj de la clase model Cliente
    const producto = new Producto({
        categoria: uid,
        proveedor: xid,
        ...req.body
    });

    try{
    //Indicar a monngoose que registre Producto a la BD
     const produtosDB = await producto.save();

    res.json({
        ok: true,
        proveedor: produtosDB
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
    
    
    const producto = await Producto.find({})
    .populate('categoria', 'nombre')
    .populate('proveedor', 'nomCompania')

    res.json({
        ok: true,
        producto
    });

}

//Busqueda Producto
const busquedaProducto = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible
    

    const [productos, productoXnombre] = await Promise.all ([
        Producto.find(
            {
                sku:miRegExp,
            }),
        Producto.find(
            {
            nombre:miRegExp,
        }),
    ]);
   
     res.json({
        ok: true,
        msg: 'busqueda Productos',
        productos,
        productoXnombre
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
        const {sku, ...campos} = req.body
        
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
            msg: 'No es posible eliminar el producto'
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
