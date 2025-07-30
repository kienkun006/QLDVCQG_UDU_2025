// routes/statsRoute.js
import express from 'express';
import db from '../models/index.js';
import { Sequelize } from 'sequelize';

const router = express.Router();

// Thống kê 
router.get('/phieus', async (req, res) => {
    try {
        const result = await db.PhieuDangKy.findAll({
            attributes: [
                [Sequelize.fn('DAYNAME', Sequelize.col('ngayDK')), 'day'],
                [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
            ],
            group: [Sequelize.fn('DAYNAME', Sequelize.col('ngayDK'))],
            raw: true
        });

        const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const labels = [];
        const counts = [];

        daysOrder.forEach(day => {
            const found = result.find(item => item.day === day);
            labels.push(day);
            counts.push(found ? found.count : 0);
        });

        res.json({ labels, counts });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi truy vấn dữ liệu', error });
    }
});

// hống kê phiếu theo loại 
router.get('/phieus/theo-loai', async (req, res) => {
    try {
        const result = await db.PhieuDangKy.findAll({
            attributes: ['loai', [Sequelize.fn('COUNT', Sequelize.col('loai')), 'count']],
            group: ['loai'],
            raw: true
        });

        const loaiMap = {
            'Khai sinh': 0,
            'Tạm trú': 0,
            'Tạm vắng': 0,
            'Cấp giấy tờ': 0
        };

        result.forEach(item => {
            if (item.loai === 'Khai sinh' || item.loai === 'Tạm trú' || item.loai === 'Tạm vắng') {
                loaiMap[item.loai] = parseInt(item.count);
            } else {
                // Gom các loại còn lại vào "Cấp giấy tờ"
                loaiMap['Cấp giấy tờ'] += parseInt(item.count);
            }
        });

        res.json(loaiMap);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thống kê theo loại phiếu', error });
    }
});

export default router;
