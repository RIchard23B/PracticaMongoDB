const { response } = require('express');
const Cliente = require('../models/cliente.model');


//Lista Clientes

const getListaClientes = async (req, res) =>{
    
    
        const clientes = await Cliente.find({});

        res.json({
            ok: true,
            clientes
        });

}

//Crear Cliente
const crearCliente = async(req, res=response)=>{

    const { email, nombre } = req.body;

    try{
        const existeEmail = await Cliente.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya ha sido registrado'
            });
        }

    //Creamos un obj de la clase model Cliente
    const cliente = new Cliente(req.body);

    //Indicar a monngoose que registre Cliente a la BD
    await cliente.save();

    res.json({
        ok: true,
        msg: 'Cliente registrado satisfactoriamente'
    });

    }catch( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }

}

//Leer Cliente por ID

const leerCliente = async (req, res=response) => {

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [cliente] = await Promise.all ([
        Cliente.find({nombre:miRegExp}), // la busqueda es por nombre
    ]);

    res.json({
        ok: true,
        msg: 'busqueda Clientes',
        cliente
    });
}

//Actualizar Cliente
const actualizarCliente = async (req, res= response) =>{
    const uid = req.params.id;

    try{
        const clienteDB = await Cliente.findById(uid);
        if(!clienteDB){
            return res.satatus(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Código previo a la actualizacion
        const {telefono, direccion, ciudad, region,email, ...campos} = req.body
        if(clienteDB.email !== email){
            const existeEmail = await Cliente.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un cliente con este email'
                });
            }
        }
        campos.email = email;

        //actualizacion de datos
        const clienteActualizado = await Cliente.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            cliente: clienteActualizado
        });


    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar cliente'
        });
    }
}


//Eliminar Cliente
const eliminarCliente = async (req, res=response) =>{

    const uid = req.params.id;

    try{
        const clienteDB = await Cliente.findById(uid);
        if(!clienteDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un cliente con ese id'
            });
        }

        await Cliente.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Cliente eliminado de la BD'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar usuario'
        });
    }
}





module.exports = {
    getListaClientes,
    crearCliente,
    leerCliente,
    actualizarCliente,
    eliminarCliente,
}
