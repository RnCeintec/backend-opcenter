import {Router} from 'express'
import {listProveedor} from '../controllers/proveedor.controller'

const router = Router()

// router.post('/monturas',createMonturas);
// router.put('/monturas/:id',updateMonturas);
// // router.delete('/product/:id',deleteProduct);
router.get('/proveedor',listProveedor);
// router.get('/ultimaMonturas',ultimaMontura);

// router.get('/product/:id',searchProduct);

export default router;
