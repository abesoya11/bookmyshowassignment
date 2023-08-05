const { sequelize } = require("../config/dbCon");
exports.home = (req, res) => {
  res.send("welcome to home");
};

exports.init = async (req, res) => {
  require("../dbModels/movie");

  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
  res.send("data initialised");
};
