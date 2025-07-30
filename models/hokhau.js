export default (sequelize, DataTypes) => {
  return sequelize.define('HoKhau', {
    id_hoKhau: { type: DataTypes.STRING(9), primaryKey: true },
    chuHo_cccd: { type: DataTypes.STRING(12), allowNull: false },
    soNhanKhau: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    diaChi: { type: DataTypes.STRING(225), allowNull: false },
    ngayCap: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    tableName: 'hokhau',
    timestamps: false
  });
};
