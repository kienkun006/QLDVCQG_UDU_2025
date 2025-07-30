import express from 'express';
import * as CongdanController from '../controllers/congdanController.js';

const router = express.Router();

router.get('/', CongdanController.getAll); 
router.get('/:id_cccd', CongdanController.getById); 
router.post('/', CongdanController.create); 
router.put('/:id_cccd', CongdanController.update); 
router.delete('/:id_cccd', CongdanController.remove); 

export default router;
