import db from '../models/index.js';


export async function getAll(req, res) {
    try {
        const data = await db.SuKien.findAll();
        res.status(200).json({ message: 'Lấy danh sách sự kiện thành công', data });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sự kiện:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function getOne(req, res) {
  try {
    const { id } = req.params;
    const event = await db.SuKien.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Không tìm thấy sự kiện' });
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}

export async function create(req, res) {
  try {
    const { id_suKienPL, tenSK, loai, noiDung } = req.body;
    const newSK = await db.SuKien.create({ id_suKienPL, tenSK, loai, noiDung });
    res.status(201).json({ message: 'Thêm sự kiện thành công', data: newSK });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { tenSK, loai, noiDung } = req.body;
    const event = await db.SuKien.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Không tìm thấy sự kiện' });

    event.tenSK = tenSK;
    event.loai = loai;
    event.noiDung = noiDung;

    await event.save();

    res.status(200).json({ message: 'Cập nhật sự kiện thành công', data: event });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}


export async function remove(req, res) {
  try {
    const { id } = req.params;
    const event = await db.SuKien.findByPk(id);
    if (!event) return res.status(404).json({ message: 'Không tìm thấy sự kiện' });

    await event.destroy();

    res.status(200).json({ message: 'Xóa sự kiện thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}
