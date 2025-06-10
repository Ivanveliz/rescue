import { UsuarioModels } from '../src/models/UsuarioModels';
import { Usuario } from '../src/entities/Usuario';
import { Request, Response } from 'express';

export class UsuarioController {
    static async crearUsuario(req: Request, res: Response) {
        try {
            const usuario = new Usuario(req.body);
            const nuevoUsuario = await UsuarioModels.crearUsuario(usuario);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }

    //controlador traer todos los usuarios
    static async obtenerTodosLosUsuarios(req: Request, res: Response) {
        try {
            const todosLosUsuarios =
                await UsuarioModels.obtenerTodosLosUsuarios();
            res.status(201).json(todosLosUsuarios);
        } catch (error) {
            console.error('Error al traer los usuarios de la BBDD', error);
            res.status(500).json({
                error: 'No se pueden visualizar los usuarios',
            });
        }
    }

    //obtener por ID
    static async obtenerPorId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const usuario = await UsuarioModels.obtenerPorId(id);

            if (usuario) {
                res.json(usuario);
            } else {
                res.status(400).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('No se puede ver el usuario', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
    //modificar usuario
    static async editarUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            const usuarioActualizado = await UsuarioModels.editarUsuario(
                id,
                data,
            );
            if (usuarioActualizado) {
                res.status(200).json({
                    mensaje: 'El usuario fue actualizado correctamente',
                });
            } else {
                res.status(404).json({
                    mensaje: 'Usuario no encontrado o sin cambios.',
                });
            }
        } catch (error) {
            console.error('Error al actualizar el usuario', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }

    //borrar usario

    static async borrarUsuario(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const usuarioEliminado = await UsuarioModels.borrarUsuario(id);
            if (usuarioEliminado) {
                res.status(200).json({
                    mensaje: 'El usuario fue eliminado correctamente.',
                });
            } else {
                res.status(404).json({
                    mensaje: 'Usuario no encontrado.',
                });
            }
        } catch (error) {
            console.error('Error al eliminar el usuario', error);
            res.status(500).json({ error: 'Error en el servidor' });
        }
    }
}
