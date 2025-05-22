import pool from '../src/models/db';
import mysql from 'mysql2/promise';
import { Usuario } from '../src/entities/Usuario';

export class UsuarioController {
    static async crearUsuario(data: any) {
        const usuario = new Usuario(data);
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
}
