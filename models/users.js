export default (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    id_user: { type: DataTypes.STRING(5), primaryKey: true },
    id_cccd: { type: DataTypes.STRING(12), allowNull: false },
    userName: { type: DataTypes.STRING(225), allowNull: false },
    passWord: { type: DataTypes.STRING(20), allowNull: false },
    vaiTro: { type: DataTypes.ENUM('Công dân', 'Quản lý'), allowNull: false },
    avata: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    update_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'users',
    timestamps: false
  });
};
