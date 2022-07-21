import {Router} from 'express'
import validateUser from 'security/validateUser';
import {getDashboard} from '../controllers/dashboard.controller'

const router = Router()

router.get('/dashboard',getDashboard);


export default router;
