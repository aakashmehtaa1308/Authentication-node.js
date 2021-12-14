const { Sequelize } = require("sequelize");
const env = require("dotenv");
env.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mariadb",
  }
);

module.exports = db;
