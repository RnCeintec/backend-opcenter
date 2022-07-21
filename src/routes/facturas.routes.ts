import {Router} from 'express'
import {listFacturas,anularFactura} from '../controllers/factura.controller'
import validateUser from '../security/validateUser'

const router = Router()

router.get('/facturas',[validateUser],listFacturas);
router.put('/anular/:id',[validateUser],anularFactura);

export default router;