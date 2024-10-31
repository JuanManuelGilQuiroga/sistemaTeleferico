const mongoose = require('mongoose');

const cabinaSchema = new mongoose.Schema({
  identificador: { type: String, required: true, unique: true },
  capacidadMaxima: { type: Number, required: true },
  estado: { type: String, enum: ['en_movimiento', 'detenida'], default: 'detenida' }
});

module.exports = mongoose.model('cabinas', cabinaSchema);
