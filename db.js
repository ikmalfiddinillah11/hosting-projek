const sequelize = require("sequelize");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const conn = new sequelize.Sequelize("mysql://avnadmin:AVNS_hNqJ1VIUgBr37vPVMJ0@mysql-3dbd2932-jayapura25-capstoneproject.aivencloud.com:17670/DB_MHET?ssl-mode=REQUIRED", {
  ssl: fs.readFileSync(path.join(__dirname, "ca.pem")),
  dialect: "mysql",
  logging: false,
});

const data = conn.define(
  "data",
  {
    id: { type: sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: sequelize.DataTypes.STRING, allowNull: false },
    nama: { type: sequelize.DataTypes.STRING, allowNull: false },
    email: { type: sequelize.DataTypes.STRING, allowNull: false },
    phone: { type: sequelize.DataTypes.STRING, allowNull: false },
    message: { type: sequelize.DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: false,
    timestamps: false,
  }
);

module.exports = { conn, data };
