
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import congdanModel from './congdan.js';
import hokhauModel from './hokhau.js';
import cutruModel from './cutru.js';
import lichsucutruModel from './lichsucutru.js';
import sukienModel from './sukien.js';
import usersModel from './users.js';
import nhankhauModel from './nhankhau.js';
import phieuDangKyModel from './phieu_dangky.js';
import hanhchinhModel from './hanhchinh.js';
import dvqlModel from './dvql.js';
import adminAccModel from './admin_acc.js';
import bhytModel from './bhyt.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false

  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Khởi tạo model
db.Congdan = congdanModel(sequelize, Sequelize.DataTypes);
db.HoKhau = hokhauModel(sequelize, Sequelize.DataTypes);
db.CuTru = cutruModel(sequelize, Sequelize.DataTypes);
db.LichSuCuTru = lichsucutruModel(sequelize, Sequelize.DataTypes);
db.SuKien = sukienModel(sequelize, Sequelize.DataTypes);
db.Users = usersModel(sequelize, Sequelize.DataTypes);
db.NhanKhau = nhankhauModel(sequelize, Sequelize.DataTypes);
db.PhieuDangKy = phieuDangKyModel(sequelize, Sequelize.DataTypes);
db.HanhChinh = hanhchinhModel(sequelize, Sequelize.DataTypes);
db.DVQL = dvqlModel(sequelize, Sequelize.DataTypes);
db.AdminAcc = adminAccModel(sequelize, Sequelize.DataTypes);
db.Bhyt = bhytModel(sequelize, Sequelize.DataTypes);



db.Congdan.hasOne(db.CuTru, { foreignKey: 'id_cccd' });
db.CuTru.belongsTo(db.Congdan, { foreignKey: 'id_cccd' });


db.Congdan.hasMany(db.LichSuCuTru, { foreignKey: 'id_cccd' });
db.LichSuCuTru.belongsTo(db.Congdan, { foreignKey: 'id_cccd' });


db.Congdan.hasOne(db.Users, { foreignKey: 'id_cccd' });
db.Users.belongsTo(db.Congdan, { foreignKey: 'id_cccd' });


db.HoKhau.hasMany(db.NhanKhau, { foreignKey: 'id_hoKhau' });
db.NhanKhau.belongsTo(db.HoKhau, { foreignKey: 'id_hoKhau' });

db.Congdan.hasMany(db.NhanKhau, { foreignKey: 'id_cccd' });
db.NhanKhau.belongsTo(db.Congdan, { foreignKey: 'id_cccd' });


db.Congdan.hasMany(db.PhieuDangKy, { foreignKey: 'id_cccd' });
db.PhieuDangKy.belongsTo(db.Congdan, { foreignKey: 'id_cccd' });


db.SuKien.hasMany(db.PhieuDangKy, { foreignKey: 'id_suKienPL' });
db.PhieuDangKy.belongsTo(db.SuKien, { foreignKey: 'id_suKienPL' });


db.Congdan.hasMany(db.HanhChinh, { foreignKey: 'id_cccd' });
db.HanhChinh.belongsTo(db.Congdan, { foreignKey: 'id_cccd' });


db.SuKien.hasMany(db.HanhChinh, { foreignKey: 'id_suKienPL' });
db.HanhChinh.belongsTo(db.SuKien, { foreignKey: 'id_suKienPL' });


db.DVQL.hasMany(db.HanhChinh, { foreignKey: 'id_dv' });
db.HanhChinh.belongsTo(db.DVQL, { foreignKey: 'id_dv' });


db.DVQL.hasMany(db.AdminAcc, { foreignKey: 'id_dvql' });
db.AdminAcc.belongsTo(db.DVQL, { foreignKey: 'id_dvql' });


db.Congdan.hasOne(db.Bhyt, { foreignKey: 'id_cccd' });
db.Bhyt.belongsTo(db.Congdan, { foreignKey: 'id_cccd' });



export default db;
