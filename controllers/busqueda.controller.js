//busquedaTotal

const { response } = require("express")

const Cliente = require('../models/cliente.model');
const Usuario = require('../models/usuario.model');
const Proveedor = require('../models/proveedor.model');
const Producto = require('../models/producto.model');
//const Order = require('../models/order.model');
const Factura = require('../models/factura.model');
const Categoria = require('../models/categoria.model');



const busquedaTotal = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [cliente, usuario, proveedor, producto, factura, categoria] = await Promise.all ([
        Usuario.find({nombre:miRegExp}), // la busqueda es por nombre
        Cliente.find({nombre:miRegExp}),
        Proveedor.find({nomCompania:miRegExp}),
        Producto.find({nombre:miRegExp}),
        Factura.find({nfactura:miRegExp}),
        Categoria.find({nombre:miRegExp})
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        cliente,
        usuario,
        proveedor,
        producto,
        factura,
        categoria
    });

}

//estructura de la peticion/coleccion/criteriobusqueda
/*const busquedaColeccion = async (req, res=response)=>{

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({nombre:miRegExp})
                            
            break;
        case 'proyectos':
            data = await Proyecto.find({nombre:miRegExp})
                    .populate('usuario','nombre img'); 
            break;    
        case 'investigadores':
            data = await Investigador.find({nombre:miRegExp})
                    .populate('usuario','nombre img')
                    .populate('proyecto','nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/proyectos/investigadores"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
    
}*/





module.exports ={
    busquedaTotal,
    //busquedaColeccion
}