const { movie, slot, theatre } = require("../dbModels/movie");

exports.movieEntry = async (req, res) => {
  console.log("post movies api hit");
  // Create a new user
  try {
    console.log(req.body.name);
    const result = await movie.create({ name: req.body.name });
    res.send(result);
    console.log("try block");
  } catch (err) {
    console.log("catch block" + err);
    res.send(err);
  }
};

exports.theatreEntry = async (req, res) => {
  console.log("post movies api hit");
  // Create a new user
  try {
    const result = await theatre.create({ name: req.body.name, city: req.body.city });
    res.send(result);
    console.log("try block");
  } catch (err) {
    console.log("catch block" + err);
    res.send(err);
  }
};

exports.slotEntry = async (req, res) => {
  console.log("post slot api hit");
  // Create a new user

  const date = new Date(req.body.ShowDate);
  console.log(date);

  console.log(date);
  try {
    const result = await slot.create({
      movieId: req.body.movieId,
      theatreId: req.body.theatreId,
      ShowDate: date,
      slot: req.body.slot,
    });
    res.send(result);
    console.log("try block");
  } catch (err) {
    console.log("catch block" + err);
    res.send(err);
  }
};
