const { Schema, model } = require ('mongoose');

const ProductoSchema = Schema({
    sku: {
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
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    precio: {
        type: Number
    },
    stock: {
        type: Number,
        default: 0
    },
    disponibilidad: {
        type: Boolean,
        default: true
    }
});


ProductoSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Producto', ProductoSchema);