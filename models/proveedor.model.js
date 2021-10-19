const { Schema, model } = require ('mongoose');

const ProveedorSchema = Schema({
    
    nomCompania: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },

    nombre: {
        type: String,
        trim: true,
        required: true
    },
    direccion: {
        type: String,
        trim: true,
        required: true
    },
    ciudad: {
        type: String,
        trim: true,
        required: true
    },
    region: {
        type: String,
        trim: true,
        required: true
    },
    pais: {
        type: String,
        trim: true,
        required: true
    },
    codPostal: {
        type: String,
    },
    telefono: {
        type: String,
        trim: true
    }
},{ collection: 'proveedores'});

ProveedorSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Proveedor', ProveedorSchema);