// models/todo.js
const { DataTypes } = require("sequelize");
const sequelize = require("../connnection"); 

const Todolist = sequelize.define("Todolist", {
  todo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Todolist;
