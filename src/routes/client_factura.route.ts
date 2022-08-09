import {Router} from 'express'
import {createClient,updateClient,deleteClient,listClient,searchClient} from '../controllers/client_factura.controller'

const router = Router()

router.post('/client_factura',createClient);
router.put('/client_factura/:id',updateClient);
router.delete('/client_factura/:id',deleteClient);
router.get('/client_factura',listClient);
router.get('/client_factura/:id',searchClient);

export default router;
