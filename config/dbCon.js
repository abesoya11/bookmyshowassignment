// Option 3: Passing parameters separately (other dialects)

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("bms", "aa", "123123", {
  host: "localhost",
  timezone: "+05:30",
  dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

async function connToDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, DataTypes, connToDb };
