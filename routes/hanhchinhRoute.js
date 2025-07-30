import express from 'express';
import { getAllHanhChinh, getHanhChinhByDonVi } from '../controllers/hanhchinhController.js';

const router = express.Router();

router.get('/', getAllHanhChinh);
router.get('/:id_dvql', getHanhChinhByDonVi); 

export default router;
