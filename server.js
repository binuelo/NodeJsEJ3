const { app } = require("./app");

// Models
const { User } = require("./models/users.models");
const { Review } = require("./models/reviews.models");
const { Game } = require("./models/games.models");
const { GamesinConsole } = require("./models/gamesinConsoles.models");
const { Console } = require("./models/consoles.models");

// Utils

const { db } = require("./utils/database");

// Database authenticated
db.authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

// Init models relations
// 1 - M
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User);

//1-M
Game.hasMany(Review, { foreignKey: "gameId" });
Review.belongsTo(Game);

//? M-M
Game.belongsToMany(Console, {
  through: "GameInConsole",
});
Console.belongsToMany(Game, {
  through: "GameInConsole",
});

/*Console.belongsToMany(GamesinConsole, {
  foreignKey: "gameId",
  through: "GameInConsole",
});
GamesinConsole.belongsToMany(Console, {
  through: "GameInConsole",
});*/
// Database synced with models' relations
db.sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
