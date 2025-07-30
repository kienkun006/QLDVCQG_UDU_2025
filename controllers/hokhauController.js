import db from '../models/index.js';

export async function getAll(req, res) {
    try {
        const danhSachHoKhau = await db.HoKhau.findAll();
        res.status(200).json({ message: 'Lấy danh sách hộ khẩu thành công', data: danhSachHoKhau });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách hộ khẩu:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function getById(req, res) {
    const id_cccd = req.params.id_cccd;

    try {
       const hoKhau = await db.HoKhau.findOne({
         where: { chuHo_cccd: req.params.id_cccd }
    });

        if (!hoKhau) {
            return res.status(404).json({ message: 'Không tìm thấy hộ khẩu cho CCCD này' });
        }

        res.status(200).json({ message: 'Lấy thông tin hộ khẩu thành công', data: hoKhau });
    } catch (error) {
        console.error('Lỗi khi lấy hộ khẩu:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function create(req, res) {
    try {
        const { id_hoKhau, chuHo_cccd, soNhanKhau, diaChi, ngayCap } = req.body;

        const newHoKhau = await db.HoKhau.create({
            id_hoKhau,
            chuHo_cccd,
            soNhanKhau,
            diaChi,
            ngayCap
        });

        res.status(201).json({ message: 'Thêm hộ khẩu thành công', data: newHoKhau });
    } catch (error) {
        console.error('Lỗi khi thêm hộ khẩu:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params;
        const { chuHo_cccd, soNhanKhau, diaChi, ngayCap } = req.body;

        const hoKhau = await db.HoKhau.findByPk(id);
        if (!hoKhau) {
            return res.status(404).json({ message: 'Không tìm thấy hộ khẩu' });
        }

        await hoKhau.update({ chuHo_cccd, soNhanKhau, diaChi, ngayCap });
        res.status(200).json({ message: 'Cập nhật hộ khẩu thành công', data: hoKhau });
    } catch (error) {
        console.error('Lỗi khi cập nhật hộ khẩu:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function remove(req, res) {
    try {
        const { id } = req.params;

        const hoKhau = await db.HoKhau.findByPk(id);
        if (!hoKhau) {
            return res.status(404).json({ message: 'Không tìm thấy hộ khẩu' });
        }

        await hoKhau.destroy();
        res.status(200).json({ message: 'Xóa hộ khẩu thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa hộ khẩu:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}


