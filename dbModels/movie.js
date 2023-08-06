const { sequelize, DataTypes } = require("../config/dbCon");

const movie = sequelize.define("movie", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    timestamps: false,
  },
});

const theatre = sequelize.define("theatre", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    timestamps: false,
    unique: "compositeIndex",
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "compositeIndex",
  },
});

const slot = sequelize.define("slot", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ShowDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const movieTheatre = sequelize.define("movieTheatre", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
console.log("running relation creation");

movie.belongsToMany(theatre, { through: { model: slot, unique: false }, foreignKey: "movieId" });
theatre.belongsToMany(movie, { through: { model: slot, unique: false }, foreignKey: "theatreId" });

theatre.hasMany(slot);
slot.belongsTo(theatre);

movie.hasMany(slot);
slot.belongsTo(movie);

module.exports = { movie, theatre, slot };

// A.hasOne(B); // A HasOne B
// A.belongsTo(B); // A BelongsTo B
// A.hasMany(B); // A HasMany B
// A.belongsToMany(B, { through: 'C' });
