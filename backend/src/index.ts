import dotenv from 'dotenv';
import db from './models/db';
import app from './app';

const PORT = process.env.PORT || 3000;

dotenv.config();

(async () => {
    try {
        await db.init();
        app.listen(PORT ,()=>{
            console.log("Corriendo en el puerto " + PORT);
             console.log("Base de datos conectada");
        })
       
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
})();



