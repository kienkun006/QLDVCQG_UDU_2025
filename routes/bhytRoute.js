import express from 'express';
import { getBHYTByCCCD, giaHanBHYT } from '../controllers/bhytController.js';

const router = express.Router();

router.get('/:id_cccd', getBHYTByCCCD);
router.put('/giahan/:id_bhyt', giaHanBHYT);

export default router;
