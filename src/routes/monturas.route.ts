import {Router} from 'express'
import {createMonturas,updateMonturas,listMonturas,ultimaMontura} from '../controllers/monturas.controller'

const router = Router()

router.post('/monturas',createMonturas);
router.put('/monturas/:id',updateMonturas);
// router.delete('/product/:id',deleteProduct);
router.get('/monturas',listMonturas);
router.get('/ultimaMonturas',ultimaMontura);

// router.get('/product/:id',searchProduct);

export default router;