export default (sequelize, DataTypes) => {
  return sequelize.define('NhanKhau', {
    id_hoKhau: { type: DataTypes.STRING(9), primaryKey: true },
    id_cccd: { type: DataTypes.STRING(12), primaryKey: true },
    mqhChuHo: { type: DataTypes.STRING(100) }
  }, {
    tableName: 'nhankhau',
    timestamps: false
  });
};
