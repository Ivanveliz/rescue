import mysql from 'mysql2/promise';

class Database {
    private pool!: mysql.Pool; // ! = “Confío en que esta propiedad va a ser inicializada antes de que se use, aunque no lo parezca ahora.”

    public async init() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            connectTimeout: 10000, // 10 segundos
        });
        try {
            await this.pool.getConnection();
            console.log('Conexión a la base de datos establecida');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
    }

    // Método para obtener el pool de conexiones
    public getPool(): mysql.Pool {
        if (!this.pool) {
            throw new Error(
                'Database pool is not initialized. Call init() first.',
            );
        }
        return this.pool;
    }

    // Método para ejecutar consultas
    public async executeQuery<T = any>(
        query: string,
        params: any[] = [],
    ): Promise<T[]> {
        const [rows] = await this.pool.execute(query, params);
        return rows as T[];
    }

    //metodo para cerrar la conexion a la base de datos
    public async close(): Promise<void> {
        if (this.pool) {
            await this.pool.end();
            console.log('Conexión a la base de datos cerrada');
        }
    }
}

export default new Database();
