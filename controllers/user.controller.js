const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// Models
const { User } = require("../models/users.models");
const { Console } = require("../models/consoles.models");
const { Game } = require("../models/games.models");
const { Review } = require("../models/reviews.models");
// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    newUser,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate credentials (email)
  const user = await User.findOne({
    where: {
      email,
      status: "active",
    },
  });

  if (!user) {
    return next(new AppError("Credentials invalid", 400));
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError("Credentials invalid", 400));
  }

  // Generate JWT (JsonWebToken) ->
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  // Send response
  res.status(200).json({
    status: "success",
    token,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({ status: "success" });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { id } = req;

  // await user.destroy();
  await user.update({ status: "Disabled" });

  res.status(204).json({ status: "success" });
});

const getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.findAll({
    where: { status: "active" },
    include: [{ model: Review, include: { model: Game, include: Console } }],
  });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

module.exports = { createUser, login, updateUser, deleteUser, getAllUser };
