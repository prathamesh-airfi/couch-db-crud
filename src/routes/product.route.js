const { Router } = require("express");
const { validate } = require("express-validation");

const ProductCtrl = require("../controllers/product.controller");
const ProductValidations = require("../validations/product.validation");

exports.productRouter = Router();

this.productRouter.get(
  "/",
  validate(ProductValidations.FETCH_PRODUCTS, { context: true }),
  ProductCtrl.fetchProducts
);

this.productRouter.get(
  "/:productId",
  validate(ProductValidations.FETCH_PRODUCT_BY_ID),
  ProductCtrl.fetchProductById
);

this.productRouter.post(
  "/",
  validate(ProductValidations.ADD_PRODUCT),
  ProductCtrl.addProduct
);

this.productRouter.put(
  "/:productId",
  validate(ProductValidations.UPDATE_PRODUCT),
  ProductCtrl.updateProduct
);

this.productRouter.delete(
  "/:productId",
  validate(ProductValidations.DELETE_PRODUCT),
  ProductCtrl.deleteProduct
);
