import express from 'express';
import indexRouter from '../routes/index.routes';
import usuarioRouter from '../routes/usuarios.routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ruta
app.use('/', indexRouter);
app.use('/api', usuarioRouter);

export default app;
