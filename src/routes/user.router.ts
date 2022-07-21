import {Router} from 'express'
import {createUser,updateUser,deleteUser,listUsers,searchUser} from '../controllers/user.controller'
import validateUser from '../security/validateUser'
const router = Router()

router.post('/users',createUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',[validateUser],deleteUser);
router.get('/users',listUsers);
router.get('/users/:id',searchUser);

export default router;