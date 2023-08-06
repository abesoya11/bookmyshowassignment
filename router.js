const express = require("express");
const { sequelize } = require("./config/dbCon");
const router = express.Router();
const { home, init } = require("./controllers/home");
const { movieEntry, theatreEntry, slotEntry, theatreMovieEntry } = require("./controllers/addEntry");
const { getCity, getDates, getAllMovieFromDate } = require("./controllers/getInfo");
router.get("/", home);
module.exports = router;

router.get("/init", init);
router.post("/movies", movieEntry);
router.post("/theatres", theatreEntry);
router.post("/slots", slotEntry);

//router.get("/city", getTheatre);
router.get("/dates", getDates);
router.get("/shows", getAllMovieFromDate);
