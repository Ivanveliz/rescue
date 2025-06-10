import express, { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controllers';

const router = express.Router();

//RUTA para crear un nuevo usuario
router.post('/usuarios', UsuarioController.crearUsuario);
router.get('/usuarios', UsuarioController.obtenerTodosLosUsuarios);
router.get('/usuario/:id', UsuarioController.obtenerPorId);
router.put('/usuarios/:id', UsuarioController.editarUsuario);
router.delete('/usuarios/:id', UsuarioController.borrarUsuario);

export default router;
