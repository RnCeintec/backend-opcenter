import {Router} from 'express'
import {createDiotrias,updateDiotrias,deleteDiotrias,listDiotrias,searchDiotrias} from '../controllers/diotrias.controller'

const router = Router()

router.post('/diotrias',createDiotrias);
router.put('/diotrias/:id',updateDiotrias);
router.delete('/diotrias/:id',deleteDiotrias);
router.get('/diotrias',listDiotrias);
router.get('/diotrias/:id',searchDiotrias);

export default router;
