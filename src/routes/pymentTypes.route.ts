import {Router} from 'express'
import validateUser from 'security/validateUser';
import {listPyment} from '../controllers/pymentTypes.controller'

const router = Router()

router.get('/pyment',listPyment);

export default router;