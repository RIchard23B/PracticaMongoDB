const { Schema, model } = require ('mongoose');

const OrderSchema = Schema({
    created: {
        type: Date,
        default: Date.now,
    },

    cliente: {
        type: Schema.ObjectId,
        ref: 'Cliente',
        required: true
    },
    productos: [{
        producto: {
            type: Schema.ObjectId,
        ref: 'Producto',
        required: true
        },
        unitPrice: {
            type: Number,
        },
        cantidad: {
            type: Number,
        },
        monto: {
            type: Number
        },
    }],
    MontoTotal:{
        type: Number
    }
});

OrderSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Order', OrderSchema);