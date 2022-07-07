const express = require("express");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");

const { gameExists } = require("../middlewares/games.middleware");
const {
  CreateReviews,
  getAllReview,
} = require("../controllers/review.controller");

const {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
} = require("../controllers/games.controller");
const GameRoute = express.Router();
GameRoute.route("/reviews/").get(getAllReview);
GameRoute.route("/reviews/:gameId").post(protectSession, CreateReviews);
GameRoute.route("/").post(protectSession, createGame).get(getAllGames);
GameRoute.use(protectSession);
GameRoute.use("/:id", gameExists)
  .route("/:id")
  .patch(updateGame)
  .delete(deleteGame);
/*;GameRoute.route("/").get(getAllUser);*/

module.exports = { GameRoute };
