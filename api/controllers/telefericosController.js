// controllers/telefericoController.js
const Cabina = require('../models/Cabina');
const Usuario = require('../models/Usuario');

class CabinasController {
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
      cabina.estado = cabina.estado === 'DETENIDA' ? 'EN_MOVIMIENTO' : 'DETENIDA';
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
    const usuariosEnCabina = await Usuario.countDocuments({ cabinaId });

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
