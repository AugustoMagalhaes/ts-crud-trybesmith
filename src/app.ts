import express from 'express';
import productsRouter from './routes/products.route';
import usersRouter from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use('/users', usersRouter);

export default app;
