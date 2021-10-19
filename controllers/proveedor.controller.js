const { response } = require('express');
const Proveedor = require('../models/proveedor.model');

//Agregar Producto
const agregarProveedor = async(req, res=response)=>{

    try{

    //Creamos un obj de la clase model proveedor

    const proveedor = new Proveedor(req.body);

    //Indicar a mongoose que registre Proveedor a la BD
    await proveedor.save();

    res.json({
        ok: true,
        msg: 'Se ha agregado un nuevo proveedor'
    });

    }catch( error ){
        if(error.code === 11000){
            res.status(400).json({
                ok: false,
                msg:  `Ya existe un proveedor con el nombre de la compañia: ${req.body.nomCompania}`
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


//Listar Proveedor
const listarProveedor = async (req, res) =>{
    
    
    const proveedor = await Proveedor.find({});

    res.json({
        ok: true,
        proveedor
    });

}

//Busqueda Proveedor
const busquedaProveedor = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [proveedor] = await Promise.all ([
        Proveedor.find(
            {
                nomCompania: miRegExp,
            }), 
    ]);

    res.json({
        ok: true,
        msg: 'busqueda Proveedor',
        proveedor
    });

}

//Actualizar Proveedor
const actualizarProveedor = async (req, res= response) =>{

    const uid = req.params.id;
        
    try {
        const proveedorDB = await Proveedor.findById(uid);

        if (!proveedorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un proveedor con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {nomCompania, ...campos} = req.body;
        if(proveedorDB.nomCompania !== nomCompania){
            const existeCompa = await Proveedor.findOne({nomCompania});
            if (existeCompa){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un proveedor'
                });
            }
        }

        campos.nomCompania = nomCompania;

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok: true,
            proveedor: proveedorActualizado
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar Proveedor'
        })
    }
}

//Eliminar Cliente
const eliminarProveedor = async (req, res=response) =>{

    const uid = req.params.id;

    try{
        const proveedorDB = await Proveedor.findById(uid);
        if(!proveedorDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un proveedor con ese id'
            });
        }

        await Proveedor.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Proveedor eliminado de la BD'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar el proveedor'
        });
    }
}



module.exports = {
    agregarProveedor,
    listarProveedor,
    busquedaProveedor,
    actualizarProveedor,
    eliminarProveedor,
}