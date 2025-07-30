import db from '../models/index.js';

export async function getAll(req, res) {
  try {
    const data = await db.Congdan.findAll(); 
    res.status(200).json({ message: 'Lấy danh sách công dân thành công', data });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}


export async function getById(req, res) {
  try {
    const { id_cccd } = req.params;
    const data = await db.Congdan.findByPk(id_cccd);
    if (!data) {
      return res.status(404).json({ message: 'Không tìm thấy công dân' });
    }
    res.status(200).json({ message: 'Tìm thấy công dân', data });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}


export async function create(req, res) {
    try {
        const { id_cccd, hoVaTen, dob, gioiTinh, danToc, quocTich, noiThuongTru, queQuan, sinhTracHoc, tonGiao } = req.body;

        if (!id_cccd || !hoVaTen || !dob || !gioiTinh || !danToc || !noiThuongTru || !queQuan || !sinhTracHoc) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
        }

        const newCitizen = await db.Congdan.create({
            id_cccd,
            hoVaTen,
            dob,
            gioiTinh,
            danToc,
            quocTich,
            noiThuongTru,
            queQuan,
            sinhTracHoc,
            tonGiao
        });

        res.status(201).json({ message: 'Thêm công dân thành công', data: newCitizen });
    } catch (error) {
        console.error('Lỗi khi thêm công dân:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

export async function update(req, res) {
    try {
        const { id_cccd } = req.params;
        const { hoVaTen, dob, gioiTinh, danToc, quocTich, noiThuongTru, queQuan } = req.body;

        const record = await db.Congdan.findByPk(id_cccd);

        if (!record) {
            return res.status(404).json({ message: 'Không tìm thấy công dân để cập nhật.' });
        }

        await record.update({ hoVaTen, dob, gioiTinh, danToc, quocTich, noiThuongTru, queQuan });

        res.status(200).json({ message: 'Cập nhật công dân thành công.', data: record });
    } catch (error) {
        console.error('Lỗi khi cập nhật công dân:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}


export async function remove(req, res) {
    try {
        const { id_cccd } = req.params;

        const record = await db.Congdan.findByPk(id_cccd);

        if (!record) {
            return res.status(404).json({ message: 'Không tìm thấy công dân để xóa.' });
        }

        await record.destroy();

        res.status(200).json({ message: 'Xóa công dân thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa công dân:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}
