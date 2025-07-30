export default (sequelize, DataTypes) => {
  return sequelize.define('AdminAcc', {
    id_admin: { type: DataTypes.STRING(5), primaryKey: true },
    id_dvql: { type: DataTypes.STRING(5), allowNull: false },
    name: { type: DataTypes.STRING(225), allowNull: false },
    password: { type: DataTypes.STRING(20), allowNull: false },
    quyenHan: { type: DataTypes.STRING(225) },
    avatar: { type: DataTypes.TEXT },
    last_login: { type: DataTypes.DATE, allowNull: false }
  }, {
    tableName: 'admin_acc',
    timestamps: false
  });
};
