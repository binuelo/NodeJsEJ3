const dotenv = require("dotenv");
// Models
const { Review } = require("../models/reviews.models");
// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

const getAllReview = catchAsync(async (req, res, next) => {
  const review = await Review.findAll();

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const CreateReviews = catchAsync(async (req, res, next) => {
  const { gameId } = req.params;
  const { userId, comment } = req.body;
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
  getAllReview,
  CreateReviews,
};
