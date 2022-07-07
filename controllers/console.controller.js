const dotenv = require("dotenv");
// Models
const { Console } = require("../models/consoles.models");
// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;
  const newConsole = await Console.create({
    name,
    company,
  });

  res.status(201).json({
    status: "success",
    newConsole,
  });
});

const getAllConsole = catchAsync(async (req, res, next) => {
  const getconsole = await Console.findAll();

  res.status(200).json({
    status: "success",
    data: { getconsole },
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  const { name } = req.body;

  await console.update({ name });

  res.status(204).json({ status: "success" });
});
const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  // await user.destroy();
  await console.update({ status: "Disabled" });

  res.status(204).json({ status: "success", message: "exito" });
});

module.exports = {
  createConsole,
  getAllConsole,
  updateConsole,
  deleteConsole,
};
