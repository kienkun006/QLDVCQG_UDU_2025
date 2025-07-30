import express from 'express';
import { create, getAll, remove, update ,getById} from '../controllers/hokhauController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id_cccd',getById );
router.post('/', create);
router.delete('/:id', remove);
router.put('/:id', update);

export default router;
