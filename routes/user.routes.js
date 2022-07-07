const express = require("express");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");

const { userExists } = require("../middlewares/users.middleware");
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controllers/user.controller");
const UserRoute = express.Router();
UserRoute.route("/signup").post(createUserValidators, createUser);
UserRoute.route("/login").post(login);
UserRoute.use(protectSession);
UserRoute.use("/:id", userExists)
  .route("/:id")
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);
UserRoute.route("/").get(getAllUser);

module.exports = { UserRoute };
