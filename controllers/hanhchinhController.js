import db from '../models/index.js';

export async function getAllHanhChinh(req, res) {
  try {
    const data = await db.HanhChinh.findAll();
    res.status(200).json(data); 
  } catch (err) {
    console.error('Lỗi khi lấy hành chính:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách hành chính' });
  }
}


export async function getHanhChinhByDonVi(req, res) {
  const { id_dvql } = req.params;
  try {
    const data = await db.HanhChinh.findAll({
      where: { id_dvql }
    });
    res.status(200).json(data);
  } catch (err) {
    console.error('Lỗi khi lọc hành chính:', err);
    res.status(500).json({ message: 'Không thể lấy dữ liệu theo đơn vị' });
  }
}
