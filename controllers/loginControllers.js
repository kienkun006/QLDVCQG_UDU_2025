import db from '../models/index.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Kiểm tra tài khoản công dân
    const user = await db.Users.findOne({
      where: { userName: username, passWord: password }
    });

    if (user) {
      return res.json({
        success: true,
        type: 'citizen',
        user: {
          id_user: user.id_user,
          userName: user.userName,
          id_cccd: user.id_cccd,
          avatar: user.avata
        }
      });
    }

    // 2. Nếu không phải công dân, kiểm tra admin
    const admin = await db.AdminAcc.findOne({
      where: { name: username, password: password }
    });

    if (admin) {
      return res.json({
        success: true,
        type: 'admin',
        admin: {
          id_admin: admin.id_admin,
          name: admin.name,
          id_dvql: admin.id_dvql,
          quyenHan: admin.quyenHan,
          avatar: admin.avatar
        }
      });
    }

    // 3. Không tìm thấy tài khoản
    return res.json({ success: false, message: 'Tài khoản không tồn tại hoặc sai mật khẩu.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
};
