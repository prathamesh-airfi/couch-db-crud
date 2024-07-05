const { Router } = require("express");
const { productRouter } = require("./product.route");

const IndexRouter = Router();

IndexRouter.use('/products', productRouter)
IndexRouter.get("/health-check", (req, res, next) => {
  return res.sendStatus(200);
});

module.exports = IndexRouter;
 