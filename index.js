const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const { sequelize, connToDb } = require("./config/dbCon");
app.use(express.json());
const router = require("./router");
app.use("/", router);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log("connected to port -" + PORT);
    connToDb();
  }
});
