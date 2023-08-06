const { theatre, slot, movie } = require("../dbModels/movie");
const { Op } = require("sequelize");

exports.getTheatre = async (req, res) => {
  let cityReq = req.query.city;

  const result = await theatre.findAll({
    where: { city: cityReq },
  });
  console.log(result);
  res.send(result);
};

exports.getDates = async (req, res) => {
  console.log("get date api hit" + req.query.theatreId);
  let theatreId = req.query.theatreId;
  let date1 = new Date(); //todays date;
  const event = new Date();

  // British English uses day-month-year order and 24-hour time without AM/PM

  let yr = date1.getFullYear();
  let mo = date1.getMonth();
  let day = date1.getDate() + 7;

  let date2 = new Date(yr, mo, day); // date of 7 days ahead
  console.log(date1);
  console.log(date2);

  const result = await slot.findAll({
    attributes: ["ShowDate"],
    where: {
      theatreId: theatreId,
      ShowDate: { [Op.between]: [date1, date2] },
    },
  });

  //console.log(result);
  res.send(result);
};

// client sends date, theatre id and output is all movies in that theatre on that date
exports.getAllMovieFromDate = async (req, res) => {
  let reqDate = new Date(req.query.date);
  let today = new Date().getDate();
  let startDate = new Date(req.query.date + " 00:00:00 ");
  console.log("todays sarts date is " + startDate);
  let endDate = new Date(req.query.date + " 23:59:50 ");

  if (today == reqDate.getDate()) {
    // if we give todays date and time is say 2 pm then show prior to pm should not be shown

    startDate = new Date();
  }

  console.log("date requested shows -- " + startDate, typeof reqDate);

  console.log("date requested shows -- " + endDate, typeof endDate);
  try {
    const result = await slot.findAll({
      attributes: ["movieId", "theatreId", "slot"],
      where: {
        ShowDate: { [Op.between]: [startDate, endDate] },
      },
      include: [
        {
          model: theatre,
          required: true,
        },
        {
          model: movie,
          required: true,
        },
      ],
    });
    let resObj = [];
    for (key in result) {
      let obj = {};

      obj.theatreName = result[key].theatre.name;
      obj.slot = result[key].slot;
      obj.movieName = result[key].movie.name;

      resObj.push(obj);
    }

    res.send(resObj);
  } catch (err) {
    res.send("erro occured " + err);
  }
};
