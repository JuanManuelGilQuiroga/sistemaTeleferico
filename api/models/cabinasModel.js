const mongoose = require('mongoose');

const cabinaSchema = new mongoose.Schema({
  capacidadMaxima: { type: Number, required: true },
  estado: { type: String, enum: ['en movimiento', 'detenida'], default: 'detenida' }
});

module.exports = mongoose.model('cabinas', cabinaSchema);
