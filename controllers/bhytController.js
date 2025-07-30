import db from '../models/index.js';

export const getBHYTByCCCD = async (req, res) => {
  try {
    const { id_cccd } = req.params;
    const bhyt = await db.Bhyt.findOne({ where: { id_cccd } });

    if (!bhyt) {
      return res.status(404).json({ message: "Không tìm thấy BHYT" });
    }

    res.status(200).json({ data: bhyt });
  } catch (error) {
    console.error("Lỗi khi lấy BHYT:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const giaHanBHYT = async (req, res) => {
  try {
    const { id } = req.params;
    const { end_date } = req.body;

    const bhyt = await db.Bhyt.findByPk(id);
    if (!bhyt) {
      return res.status(404).json({ message: "Không tìm thấy BHYT để gia hạn" });
    }

    bhyt.end_date = end_date;
    await bhyt.save();

    res.status(200).json({ message: "Gia hạn thành công", data: bhyt });
  } catch (error) {
    console.error("Lỗi khi gia hạn:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
