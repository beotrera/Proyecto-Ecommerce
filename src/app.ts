import express from 'express';
import User from './routes/user';
import Auth from './routes/auth';
import Product from './routes/product';
import Cart from './routes/cart';
import errorMiddleware from './utils/error';

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/user',User);
app.use('/product',Product);
app.use('/auth',Auth);
app.use('/cart',Cart);

app.use(errorMiddleware);

export default app;