const express = require("express");

const IndexRouter = require("../routes/index.route");
const {
  NotFoundHandler,
  MainErrorHandler,
} = require("../middlewares/error.middleware");

const app = express();

/* Middleware Stack */
app.use(express.json());

/* Initialize Routes */
app.use(IndexRouter);

/* Initialize Error Handlers */
app.use(NotFoundHandler);
app.use(MainErrorHandler);

module.exports = app;