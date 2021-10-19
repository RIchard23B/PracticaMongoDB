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
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    proveedor:{
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true
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