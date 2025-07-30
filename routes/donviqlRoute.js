import express from 'express';
import * as donviqlController from '../controllers/donviqlController.js';

const router = express.Router();

router.get('/', donviqlController.getAll);
router.get('/:id', donviqlController.getById);
router.post('/', donviqlController.create);
router.put('/:id', donviqlController.update);
router.delete('/:id', donviqlController.remove);

export default router;
