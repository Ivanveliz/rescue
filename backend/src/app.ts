import express from 'express';
import routes from '../routes/index.routes';
import usuarioRouter from '../routes/usuarios.routes';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

//ruta
app.use('/api', usuarioRouter);
export default app;
