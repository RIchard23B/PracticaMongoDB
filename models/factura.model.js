const { Schema, model } = require ('mongoose');

//Definición de esquemas para la coleccion de usuarios

const FacturaSchema = Schema({
    nfactura: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    suspendido: {
        type: Boolean,
        default: false
    }
});


FacturaSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Factura', FacturaSchema);