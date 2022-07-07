// Models
const { Console } = require("../models/consoles.models");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const cosoleExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const console = await Console.findOne({ where: { id } });

  if (!console) {
    return next(new AppError("Cosole not found", 404));
  }

  req.console = console;
  next();
});

module.exports = { cosoleExists };
