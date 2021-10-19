const { response } = require('express');
const Order = require('../models/order.model');


//Registrar Orden 
const registrarOrder = async(req, res=response)=>{

    try{

    //Creamos un obj de la clase model Orden
    const order = new Order(req.body);

    //Indicar a monngoose que registre Orden a la BD
    await order.save();

    res.json({
        ok: true,
        order
    });

    }catch( error ){
        console.log(error);

        res.status(400).json({
            ok: false,
            msg:  "Error en procesar la Petición"
        });
    }

}

//Lista de Ordenes
const listaOrder = async(req, res )=>{
    
    try{

    const orders = await Order.find({})
    .populate('cliente')
    .populate({
        path: 'productos.producto',
        model: 'Producto'
    });

    res.json({
        ok: false,
        orders
    });
    }catch(error){
        res.status(400).json({
            ok: false,
            msg: 'Error al procesar la peticion'
        });
    }
}


const buscarOrden = async(req, res ) =>{


    try{
        const order = await Order.findById(req.params.id)
        .populate('cliente')
        .populate({
            path: 'productos.producto',
            model: 'Producto'
    });
        const orden = await Order.find({cliente: req.params.id})
        .populate('cliente')
        .populate({
            path: 'productos.producto',
            model: 'Producto'
    });
  


    if(order){
        return res.json({
            ok: true,
            order,
        });
    }else 
        if (orden) {
            return res.json({
                ok: true,
                orden
        });
    } else{
        return res.status(404).json({
            ok: false,
            msg: 'La orden no existe...'

        });
    }
    
    

    }catch(error){  
        res.status(400).json({
            ok: false,
            msg: 'Error al procesar la petición'
        })
    }
}

const actualizarOrden = async(req, res=response) => {
    
    const uid = req.params.id;

    try{
        const ordenDB = await Order.findById(uid);
        if(!ordenDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe una orden con ese id'
            });
        }
        
        const actualizarOrden = await Order.findByIdAndUpdate(uid,req.body, {new:true})
        .populate('cliente')
        .populate({
        path: 'productos.producto',
        model: 'Producto'
        });

        res.json({
            ok:true,
            order: actualizarOrden
        })
        
       
    }catch(error){
        res.status(400).json({
            ok: false,
            msg: 'Error al procesar la petición'
        });
    }
}


const eliminarOrden = async(req,res)=>{

    const uid = req.params.id;
    try{

        await Order.findByIdAndRemove(uid);
        res.json({
            ok:false,
            msg: 'La orden ha sido eliminada'
        })

    }catch(error){
        res.status(400).json({
            msg: 'Error al procesar, consulte con el admin'
        });
    }
}

const buscarOrdenCliente = async (req, res)=>{
    
    try{
        const orden = await Order.find({cliente: req.params.id})
        .populate('cliente')
        .populate({
            path: 'productos.producto',
            model: 'Producto'
    });

    res.json({
        ok: true,
        orden
    });
    }catch(error){
        res.status(400).json({
            ok: false,
            msg:'Error al procesar, consulta con el admin'
        });
    }
}


module.exports = {
    registrarOrder,
    listaOrder,
    buscarOrden,
    actualizarOrden,
    eliminarOrden,
    //buscarOrdenCliente,
}