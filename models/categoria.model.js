const { Schema, model } = require ('mongoose');

//Definición de esquemas para la coleccion de usuarios

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    descripcion: {
        type: String,
        trim: true,
        require: true
    },
    img: {
        type: String
    }
});

CategoriaSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Categoria', CategoriaSchema);