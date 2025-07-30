import db from '../models/index.js';

export async function create(req, res) {
    try {
        const { id_dvql, tendv, diaChi, capQL } = req.body;

        const newDVQL = await db.DVQL.create({ id_dvql, tendv, diaChi, capQL });

        res.status(201).json({ message: 'Thêm đơn vị quản lý thành công', data: newDVQL });
    } catch (error) {
        console.error('Lỗi khi thêm đơn vị quản lý:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function getAll(req, res) {
    try {
        const data = await db.DVQL.findAll();
        res.status(200).json({ message: 'Lấy danh sách đơn vị quản lý thành công', data });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}


export async function getById(req, res) {
    try {
        const { id } = req.params;
        const dvql = await db.DVQL.findByPk(id);

        if (!dvql) {
            return res.status(404).json({ message: 'Không tìm thấy đơn vị quản lý' });
        }

        res.status(200).json({ message: 'Lấy chi tiết thành công', data: dvql });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}


export async function update(req, res) {
    try {
        const { id } = req.params;
        const { tendv, diaChi, capQL } = req.body;

        const dvql = await db.DVQL.findByPk(id);

        if (!dvql) {
            return res.status(404).json({ message: 'Không tìm thấy đơn vị quản lý' });
        }

        await dvql.update({ tendv, diaChi, capQL });

        res.status(200).json({ message: 'Cập nhật thành công', data: dvql });
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params;

        const dvql = await db.DVQL.findByPk(id);

        if (!dvql) {
            return res.status(404).json({ message: 'Không tìm thấy đơn vị quản lý' });
        }

        await dvql.destroy();

        res.status(200).json({ message: 'Xóa đơn vị quản lý thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}
