const dotenv = require("dotenv");
// Models
const { Game } = require("../models/games.models");
const { Review } = require("../models/reviews.models");
// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;
  const newGame = await Game.create({
    title,
    genre,
  });

  res.status(201).json({
    status: "success",
    newGame,
  });
});

const getAllGames = catchAsync(async (req, res, next) => {
  const game = await Game.findAll();

  res.status(200).json({
    status: "success",
    data: { game },
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  const { title } = req.body;

  await game.update({ title });

  res.status(204).json({ status: "success" });
});
const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  // await user.destroy();
  await game.update({ status: "Disabled" });

  res.status(204).json({ status: "success", message: "exito" });
});
const CreateReviews = catchAsync(async (req, res, next) => {
  const { userId, gameId } = req.params;
  const { comment } = req.body;
  const newReview = await Review.create({
    userId,
    gameId,
    comment,
  });

  res.status(201).json({
    status: "success",
    newReview,
  });
});

module.exports = {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
  CreateReviews,
};
