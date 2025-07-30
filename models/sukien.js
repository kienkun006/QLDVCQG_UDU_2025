export default (sequelize, DataTypes) => {
  return sequelize.define('SuKien', {
    id_suKienPL: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
      validate: {
        is: /^[A-Z]{2}[0-9]{3}$/ 
      }
    },
    tenSK: {
      field: 'tensk',
      type: DataTypes.STRING(225),
      allowNull: false
    },
    loai: {
      type: DataTypes.ENUM('Cư trú', 'Hộ tịch – Nhân thân', 'Tùy Thân'),
      allowNull: false
    },
    noiDung: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'sukien',
    timestamps: false
  });
};

