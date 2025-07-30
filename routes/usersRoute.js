import express from 'express';
import * as UsersController from '../controllers/usersController.js';

const router = express.Router();

router.get('/', UsersController.getAll);
router.get('/cccd/:id_cccd', UsersController.getUserByCccd);
router.post('/', UsersController.create);
router.put('/:id_user', UsersController.update);
router.delete('/:id_user', UsersController.remove);

export default router;
