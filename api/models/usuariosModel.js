// models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  cabinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'cabinas', default: null }
});

module.exports = mongoose.model('usuarios', usuarioSchema);
