import {Router} from 'express'
import {createCategory,updateCategory,deleteCategory,listcategory,searchCategory} from '../controllers/category.controller'

const router = Router()

router.post('/category',createCategory);
router.put('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);
router.get('/category',listcategory);
router.get('/category/:id',searchCategory);

export default router;
