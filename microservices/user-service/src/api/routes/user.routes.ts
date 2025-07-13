import { Router } from 'express';
import { UserController } from '../controllers';
import { validateRequest } from '../../../../shared/src/middleware';
import { userSchema } from '../../validators/schemas';

const router = Router();
const userController = new UserController();

router.get('/:id', userController.getUser.bind(userController));
router.post('/', validateRequest(userSchema), userController.createUser.bind(userController));
router.put('/:id', validateRequest(userSchema), userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));

export default router;
