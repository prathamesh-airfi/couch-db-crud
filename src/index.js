const express = require("express");

const IndexRouter = require("./routes/index.route");
const {
  NotFoundHandler,
  MainErrorHandler,
} = require("./middlewares/error.middleware");

const app = express();

/* Middleware Stack */
app.use(express.json());

/* Initialize Routes */
app.use(IndexRouter);

/* Initialize Error Handlers */
app.use(NotFoundHandler);
app.use(MainErrorHandler);

app.listen(8000, () => {
  console.log("Server is up and running at 8000");
});
