import { Router } from 'express';
import { getToken, auth } from '../controllers/auth';

const route = Router();

route.post('/getTokeen',getToken);

export default route