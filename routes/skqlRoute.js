import express from 'express';
import * as SuKienController from '../controllers/skqlController.js';

const router = express.Router();

router.get('/', SuKienController.getAll);
router.get('/:id', SuKienController.getOne);
router.post('/', SuKienController.create);
router.put('/:id', SuKienController.update);
router.delete('/:id', SuKienController.remove);

export default router;
