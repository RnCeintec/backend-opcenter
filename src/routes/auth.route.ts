import {Router} from 'express'
import {auth} from '../controllers/auth.controller'

const router = Router()

router.post('/login',auth);

export default router;