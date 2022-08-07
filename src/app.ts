import express from 'express';
import ordersRouter from './routes/orders.route';
import productsRouter from './routes/products.route';
import usersRouter from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use('/users', usersRouter);

app.use('/orders', ordersRouter);

export default app;
