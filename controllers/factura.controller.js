const { response } = require('express');
const Factura = require('../models/factura.model');

//Agregar Producto
const agregarFactura = async(req, res=response)=>{

    const uid = req.uid;
    const xid =req.uid;
    

    //Creamos un obj de la clase model Cliente
    const factura = new Factura({
        order: uid,
        usuario: xid,
        ...req.body
    });

    try{
    //Indicar a monngoose que registre Producto a la BD
     const facturaDB = await factura.save();

    res.json({
        ok: true,
        factura: facturaDB
    });

    }catch( error ){
        if(error.code === 11000){
            res.status(400).json({
                ok: false,
                msg:  `Ya existe una factura con el N° de Factura : ${req.body.nfactura}`
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
//Listar Factura
const listarFactura = async (req, res) =>{
    
    
    const factura = await Factura.find({})
    .populate('order', 'productos')
    .populate('cliente', 'nombre')
    .populate('usuario', 'nombre')

    res.json({
        ok: true,
        factura
    });

}

//Busqueda Producto
const busquedaFactura = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [factura] = await Promise.all([
        Factura.find(
            {
                nfactura:miRegExp,
            })
            
    ]);
    
            

    res.json({
        ok: true,
        msg: 'busqueda Factura',
        factura
    });

}

//Actualizar Factura
const actualizarFactura = async (req, res= response) =>{
    const uid = req.params.id;

    try{
        const facturaDB = await Factura.findById(uid);
        if(!facturaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Código previo a la actualizacion
        const {nfactura, ...campos} = req.body
        
        campos.nfactura = nfactura;

        //actualizacion de datos
        const facturaActualizado = await Factura.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            factura: facturaActualizado
        });


    }catch(error) {
        console.log(error);
        if(error.code === 11000){
            res.status(400).json({
                ok: false,
                msg:  `Ya existe una factura con el N: ${req.body.nfactura}`
            });


        }else{
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al actualizar la factura'
            });
        }
    }
}

//Eliminar factura
const eliminarFactura = async (req, res=response) =>{

    const uid = req.params.id;

    try{
        const facturaDB = await Factura.findById(uid);
        if(!facturaDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe una factura con ese id'
            });
        }

        await Factura.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'La factura se ah eliminado de la BD'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar la factura'
        });
    }
}



module.exports = {
    agregarFactura,
    listarFactura,
    busquedaFactura,
    actualizarFactura,
    eliminarFactura,
}