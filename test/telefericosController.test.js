// __tests__/telefericoController.test.js
const mongoose = require('mongoose');
const TelefericoController = require('../api/controllers/telefericoController');
const connectDB = require('../api/db/db');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('TelefericoController', () => {
    it('debería crear una cabina correctamente', async () => {
        const cabina = await TelefericoController.crearCabina('CAB001', 6);
        expect(cabina.identificador).toBe('CAB001');
        expect(cabina.capacidadMaxima).toBe(6);
        expect(cabina.estado).toBe('detenida');
    });

    it('debería mover la cabina', async () => {
        const cabina = await TelefericoController.crearCabina('CAB002', 4);
        const cabinaMovida = await TelefericoController.moverCabina('CAB002');
        expect(cabinaMovida.estado).toBe('en_movimiento');
    });

    it('debería agregar un usuario a una cabina sin exceder la capacidad', async () => {
        const usuario = await TelefericoController.solicitarViaje({ nombre: 'Juan', edad: 25 });
        const cabina = await TelefericoController.crearCabina('CAB003', 2);
        const usuarioAsignado = await TelefericoController.agregarUsuarioACabina(usuario._id, cabina.identificador);
        expect(usuarioAsignado.cabinaId).toStrictEqual(cabina._id);
    });

    it('debería lanzar un error si la cabina está llena', async () => {
        const cabina = await TelefericoController.crearCabina('CAB004', 1);
        await TelefericoController.solicitarViaje({ nombre: 'Maria', edad: 30, /*cabinaId: cabina.insertedId*/}); //El error es la falta de implementacion del tercer campo
        const usuario2 = await TelefericoController.solicitarViaje({ nombre: 'Carlos', edad: 40, /*cabinaId: cabina.insertedId*/ });
        await expect(TelefericoController.agregarUsuarioACabina(usuario2._id, cabina.identificador)).rejects.toThrow('La cabina está llena');
    });    
});
