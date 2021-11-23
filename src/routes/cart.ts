import { Router } from 'express';
import { deleteAllCart, deleteOneItem, findOne, update } from '../controllers/cart';
import { auth } from '../controllers/auth';

const route = Router();

route.put('/update', auth, update);
route.get('/find', auth, findOne);
route.delete('/deleteCart', auth, deleteAllCart);
route.delete('/delete/:id', auth, deleteOneItem);

export default route