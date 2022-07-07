const express = require("express");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");

const { cosoleExists } = require("../middlewares/console.middleware");

const {
  getAllConsole,
  createConsole,
  updateConsole,
  deleteConsole,
} = require("../controllers/console.controller");
const cosoleRoute = express.Router();
cosoleRoute.route("/").get(getAllConsole);
cosoleRoute.use(protectSession);
cosoleRoute.route("/").post(createConsole);
cosoleRoute
  .use("/:id", cosoleExists)
  .route("/:id")
  .patch(updateConsole)
  .delete(deleteConsole);

module.exports = { cosoleRoute };
