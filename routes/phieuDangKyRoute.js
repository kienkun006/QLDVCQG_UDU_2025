import express from 'express';
import { createPhieu, getPhieuByUser, getAllPhieu, updatePhieu } from '../controllers/phieuDangKyController.js';

const router = express.Router();

router.post('/', createPhieu);
router.get('/user/:id_cccd', getPhieuByUser);          
router.get('/', getAllPhieu);    
//duyet                        
router.put('/:id_phieu', updatePhieu);                   

export default router;

