const { response } = require('express');
const Categoria = require('../models/categoria.model');

//Agregar Categoria
const agregarCategoria = async(req, res=response)=>{

    

    try{    

    //Creamos un obj de la clase model Cliente
    
    const categoria = new Categoria(req.body);
    //Indicar a monngoose que registre Categoria a la BD
    await categoria.save();

    res.json({
        ok: true,
        msg: 'Se ingresó una nueva categoría'
    });

    }catch( error ){
        if(error.code === 11000){
            res.status(400).json({
                ok: false,
                msg:  `Ya existe una categoria con el nombre: ${req.body.nombre}`
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


//Listar Categoria  
const listarCategoria = async (req, res) =>{
    
    const categoria = await Categoria.find();

        res.json({
            ok: true,
            categoria
        });
    

}

//Buscar Categoria por ID y Nombre
const buscarCategoria = async (req, res=response) => {

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [categoria] = await Promise.all ([
        Categoria.find({nombre:miRegExp}), // la busqueda es por nombre
    ]);

    res.json({
        ok: true,
        msg: 'busqueda Categoria',
        categoria
    });
}

//Actualizar Categoria
const actualizarCategoria = async (req, res= response) =>{
    const uid = req.params.id;

    try{
        const categoriaDB = await Categoria.findById(uid);
        if(!categoriaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Código previo a la actualizacion
        const {nombre,descripcion, ...campos} = req.body
        if(categoriaDB.nombre !== nombre){
            const existeNombre = await Categoria.findOne({nombre});
            if(existeNombre){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe una categoria con ese nombre'
                });
            }
        }
        campos.nombre = nombre;

        //actualizacion de datos
        const categoriaActualizado = await Categoria.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            categoria: categoriaActualizado
        });


    }catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar categoria'
        });
    }
}

//Eliminar Categoria
const eliminarCategoria = async (req, res=response) =>{

    const uid = req.params.id;

    try{
        const categoriaDB = await Categoria.findById(uid);
        if(!categoriaDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe una categoria con ese id'
            });
        }

        await Categoria.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Cliente eliminado de la BD'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar la categoria'
        });
    }
}

module.exports = {
    agregarCategoria,
    listarCategoria,
    buscarCategoria,
    agregarCategoria,
    actualizarCategoria,
    eliminarCategoria,
}