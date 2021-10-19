const fs = require('fs'); //para leer archivos y carpetas del filesystem

const Usuario = require('../models/usuario.model');
const Categoria = require('../models/categoria.model');

const borrarImagen = (path)=>{
    
    if(fs.existsSync(path)){
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipoColeccion,id, nombreArchivo) =>{
    let pathViejo = '';
    switch (tipoColeccion) {
            
        case 'categorias':
            const categoria = await Categoria.findById(id);
            if(!categoria){
                console.log('Id de proyecto no encontrado');
                return false;
            }
            pathViejo = `./uploads/categorias/${categoria.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            categoria.img = nombreArchivo;
            await categoria.save();
            return true;
            
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('Id de usuario no encontrado');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }

}


module.exports = {
    actualizarImagen,
}