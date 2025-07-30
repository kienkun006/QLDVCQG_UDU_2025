export default (sequelize, DataTypes) => {
  return sequelize.define('Congdan', {
    id_cccd: { type: DataTypes.STRING(12), primaryKey: true },
    hoVaTen: { type: DataTypes.STRING(225), allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    gioiTinh: { type: DataTypes.ENUM('Nam', 'Nữ'), allowNull: false },
    danToc: { type: DataTypes.STRING(225), allowNull: false },
    quocTich: { type: DataTypes.STRING(225), allowNull: false, defaultValue: 'Việt Nam' },
    noiThuongTru: { type: DataTypes.STRING(225), allowNull: false },
    sinhTracHoc: { type: DataTypes.TEXT, allowNull: false },
    avatar: { type: DataTypes.TEXT },
    tonGiao: { type: DataTypes.STRING(225) },
    queQuan: { type: DataTypes.STRING(225), allowNull: false }
  }, {
    tableName: 'congdan',
    timestamps: false
  });
};
