const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productosSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        require: [true, 'El nombre es necesario']
    },
    precio: {
        type: Number,
        require: [true, 'El precio es requerido']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Productos', productosSchema);