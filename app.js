const express = require("express");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

// Routers
const { UserRoute } = require("./routes/user.routes");
const { GameRoute } = require("./routes/game.routes");
const { cosoleRoute } = require("./routes/console.routes");

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/games", GameRoute);
app.use("/api/v1/consoles", cosoleRoute);

app.use(globalErrorHandler);

module.exports = { app };

// Gen random strings
// require('crypto').randomBytes(64).toString('hex');
