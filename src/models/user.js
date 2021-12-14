const sequelize = require("sequelize");
const db = require("../database");

const User = db.define(
  "User",
  {
    first_name: { type: sequelize.STRING },
    last_name: { type: sequelize.STRING },
    username: { type: sequelize.STRING, unique: true },
    email: { type: sequelize.STRING, unique: true },
    password: { type: sequelize.STRING },
  },
  { timestamps: true }
);

module.exports = User;
