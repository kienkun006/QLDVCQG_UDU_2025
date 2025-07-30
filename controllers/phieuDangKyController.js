import db from '../models/index.js';
import { Op } from 'sequelize';

// Tạo 
export async function createPhieu(req, res) {
  try {
    const { id_cccd, id_suKienPL, loai, ngayDK, noiDung } = req.body;

    const citizen = await db.Congdan.findByPk(id_cccd);
    if (!citizen) {
      return res.status(400).json({ message: 'Công dân không tồn tại, vui lòng kiểm tra số CCCD.' });
    }
    const newPhieu = await db.PhieuDangKy.create({
      id_cccd,
      id_suKienPL,
      loai,
      ngayDK,
      noiDung
    });

    res.status(201).json({ message: 'Thêm phiếu đăng ký thành công', data: newPhieu });
  } catch (error) {
    console.error('Lỗi khi thêm phiếu:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}


export async function getAllPhieu(req, res) {
  const { status, id_cccd } = req.query;
  const where = {};
  if (status) where.trangThai = status;
  if (id_cccd) where.id_cccd = { [Op.like]: `%${id_cccd}%` };

  try {
    const data = await db.PhieuDangKy.findAll({ where });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi truy vấn danh sách', error: err.message });
  }
}

export async function getPhieuByUser(req, res) {
  try {
    const data = await db.PhieuDangKy.findAll({
      where: { id_cccd: req.params.id_cccd }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi truy vấn phiếu', error: err.message });
  }
}

// Cập nhật trạng thái phiếu và lưu vào bảng hành chính nếu duyệt
export async function updatePhieu(req, res) {
  const { id_phieu } = req.params;
  const { trangThai, admin_notes, admin_user, thoiGianDuyet } = req.body;

  try {
    const [updated] = await db.PhieuDangKy.update(
      { trangThai, admin_notes },
      { where: { id_phieu } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: 'Phiếu không tồn tại' });
    }

    // Nếu duyệt thì ghi vào bảng hành chính
    if (trangThai === 'Đã Xử Lý') {
      const phieu = await db.PhieuDangKy.findByPk(id_phieu);
      const admin = await db.AdminAcc.findOne({ where: { id_admin: admin_user } });

      if (phieu && admin) {
        await db.HanhChinh.create({
          id_hanhchinh: `HC${Date.now()}`,
          id_cccd: phieu.id_cccd,
          id_suKienPL: phieu.id_suKienPL,
          thoiGian: thoiGianDuyet,
          id_dv: admin.id_dvql
        });
      }
    }

    res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    console.error('Lỗi cập nhật phiếu:', err);
    res.status(500).json({ message: 'Lỗi cập nhật phiếu', error: err.message });
  }
}
