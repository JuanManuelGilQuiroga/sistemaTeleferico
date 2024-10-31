// controllers/telefericoController.js
const Cabina = require('../models/cabinasModel');
const Usuario = require('../models/usuariosModel');

class TelefericoController {
  async crearCabina(id, capacidad) {
    const cabina = new Cabina({ identificador: id, capacidadMaxima: capacidad });
    await cabina.save();
    return cabina;
  }

  async eliminarCabina(id) {
    return await Cabina.findOneAndDelete({ identificador: id });
  }

  async moverCabina(id) {
    const cabina = await Cabina.findOne({ identificador: id });
    if (cabina) {
      cabina.estado = cabina.estado === 'detenida' ? 'en_movimiento' : 'detenida';
      await cabina.save();
    }
    return cabina;
  }

  async solicitarViaje(usuarioData) {
    const usuario = new Usuario(usuarioData);
    await usuario.save();
    return usuario;
  }

  async agregarUsuarioACabina(usuarioId, cabinaId) {
    const cabina = await Cabina.findOne({ identificador: cabinaId });
    const usuario = await Usuario.findById(usuarioId);

    if (!cabina || !usuario) throw new Error('Cabina o usuario no encontrado');

    // Obtén el conteo actual de usuarios en la cabina
    const usuariosEnCabina = await Usuario.countDocuments({ cabinaId: cabina._id });
    console.log('Usuarios en la cabina:', usuariosEnCabina); // Para verificar el conteo durante la prueba

    if (usuariosEnCabina < cabina.capacidadMaxima) {
      usuario.cabinaId = cabina._id;
      await usuario.save();
      return usuario;
    } else {
      throw new Error('La cabina está llena');
    }
  }
}

module.exports = new TelefericoController();
