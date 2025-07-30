export default (sequelize, DataTypes) => {
  return sequelize.define('PhieuDangKy', {
    id_phieu: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    id_cccd: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    id_suKienPL: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    loai: {
      type: DataTypes.ENUM(
        'Tạm trú',
        'Tạm vắng',
        'Khai sinh',
        'Khai tử',
        'Gia hạn BHYT',
        'Cấp lại giấy tờ'
      ),
      allowNull: false
    },
    ngayDK: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    trangThai: {
      type: DataTypes.ENUM('Chưa Xử Lý', 'Đã Xử Lý'),
      allowNull: false,
      defaultValue: 'Chưa Xử Lý'
    },
    noiDung: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'phieu_dangky',
    timestamps: false
  });
};
