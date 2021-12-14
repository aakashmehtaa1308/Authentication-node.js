const sequelize = require("sequelize");
const db = require("../database");

const User = db.define(
  "User",
  {
    first_name: { type: sequelize.STRING, require: true },
    last_name: { type: sequelize.STRING, require: true },
    username: { type: sequelize.STRING, unique: true, require: true },
    email: { type: sequelize.STRING, unique: true, require: true },
    password: { type: sequelize.STRING, require: true },
  },
  { timestamps: true }
);

module.exports = User;
