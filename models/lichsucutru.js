export default (sequelize, DataTypes) => {
  return sequelize.define('LichSuCuTru', {
    id_lichsu: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    id_cccd: { type: DataTypes.STRING(12), allowNull: false },
    diaChi: { type: DataTypes.STRING(225), allowNull: false },
    loai: { type: DataTypes.ENUM('Thường trú', 'Tạm trú', 'Tạm vắng'), allowNull: false },
    start_date: { type: DataTypes.DATEONLY },
    end_date: { type: DataTypes.DATEONLY },
    note: { type: DataTypes.TEXT }
  }, {
    tableName: 'lichsucutru',
    timestamps: false
  });
};
