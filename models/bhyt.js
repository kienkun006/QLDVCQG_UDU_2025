export default (sequelize, DataTypes) => {
  return sequelize.define('Bhyt', {
    id_bhyt: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      validate: {
        is: /^[0-9]{9}$/ 
      }
    },
    id_cccd: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true 
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    diaChi_dk: {
      type: DataTypes.STRING(225),
      allowNull: false
    }
  }, {
    tableName: 'bhyt',
    timestamps: false
  });
};
