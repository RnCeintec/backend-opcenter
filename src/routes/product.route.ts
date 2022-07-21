import {Router} from 'express'
import {createProduct,updateProduct,deleteProduct,listProducts,searchProduct} from '../controllers/product.controller'

const router = Router()

router.post('/product',createProduct);
router.put('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);
router.get('/product',listProducts);
router.get('/product/:id',searchProduct);

export default router;