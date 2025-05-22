import express, { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controllers';

const router = express.Router();

//RUTA para crear un nuevo usuario
router.post('usuarios', async (req, res) => {
    try {
        const nuevoUsuario = await UsuarioController.crearUsuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

export default router;
