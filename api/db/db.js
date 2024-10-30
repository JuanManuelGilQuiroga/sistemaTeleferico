const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:admin@junction.proxy.rlwy.net:13517/sistemaGestionTeleferico', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
  }
};

module.exports = connectDB;
