import pool from '../models/db';
import { Usuario } from '../entities/Usuario';
import mysql from 'mysql2/promise';

//Modelo para crear usuario
export class UsuarioModels {
    //Promise<Usuario> esti significa que esta funcion devuelve una promesa, que cuando se resuelve te da un objeto de tipo usuario.
    static async crearUsuario(usuario: Usuario): Promise<Usuario> {
        try {
            const [result] = await pool
                .getPool()
                .execute<mysql.ResultSetHeader>(
                    'INSERT INTO usuarios (nombre, apellidos, contrasena, email, tel, role, cargo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [
                        usuario.nombre,
                        usuario.apellidos,
                        usuario.contrasena,
                        usuario.email,
                        usuario.tel,
                        usuario.role,
                        usuario.cargo,
                    ],
                );

            if (result.affectedRows > 0) {
                usuario.id = result.insertId;
                console.log('Usuario creado:', usuario);
            } else {
                throw new Error('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw error;
        }
        return usuario;
    }

    //modelo para traer todo
    static async obtenerTodosLosUsuarios(): Promise<Usuario[]> {
        const [rows] = await pool.getPool().query('SELECT * FROM usuarios');
        return rows as Usuario[];
    }

    //modelo para traer 1
    static async obtenerPorId(id: number): Promise<Usuario | null> {
        const [rows] = await pool
            .getPool()
            .query('SELECT * FROM usuarios WHERE id =?', [id]);
        const result = rows as Usuario[];
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }

    //modelo editar
    static async editarUsuario(
        id: number,
        data: Partial<Usuario>,
    ): Promise<boolean> {
        const [result] = await pool
            .getPool()
            .execute<mysql.ResultSetHeader>(
                'UPDATE usuarios SET nombre = ?, apellidos = ?, email = ?, tel = ?, role = ?, cargo = ? WHERE id = ?',
                [
                    data.nombre,
                    data.apellidos,
                    data.email,
                    data.tel,
                    data.role,
                    data.cargo,
                    id,
                ],
            );
        return result.affectedRows > 0;
    }

    //modelo para borrar
    static async borrarUsuario(id: number): Promise<boolean> {
        const [result] = await pool
            .getPool()
            .execute<mysql.ResultSetHeader>(
                'DELETE FROM usuarios WHERE id= ?',
                [id],
            );
        return result.affectedRows > 0;
    }
}
