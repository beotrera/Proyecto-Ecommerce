import { Router } from 'express';
import { create, find, findById, update, deleteById } from '../controllers/product';
import { auth, isAdmin } from '../controllers/auth';

const route = Router();

route.put('/update/:id', auth, update);
route.post('/create', isAdmin, create);
route.get('/find', auth, find);
route.get('/find/:id', auth, findById);
route.delete('/delete/:id', isAdmin, deleteById);


export default route