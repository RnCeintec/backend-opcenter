import {Router} from 'express'
import {createClient,updateClient,deleteClient,listClient,searchClient} from '../controllers/client.controller'

const router = Router()

router.post('/client',createClient);
router.put('/client/:id',updateClient);
router.delete('/client/:id',deleteClient);
router.get('/client',listClient);
router.get('/client/:id',searchClient);

export default router;
