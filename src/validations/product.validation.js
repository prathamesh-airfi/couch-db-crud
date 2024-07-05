const { Joi } = require("express-validation");

const PRODUCT_ID_VALIDATION = Joi.string().required();

const NUMBER_FIELD_VALIDATION = [
  Joi.number().optional(),
  Joi.object({
      gt: Joi.number().min(1).optional(),
      gte: Joi.number().min(1).optional(),
      lt: Joi.number().min(1).optional(),
      lte: Joi.number().min(1).optional()
  }).optional().not({})
]

exports.ADD_PRODUCT = {
  body: Joi.object({
    productId: PRODUCT_ID_VALIDATION,
    productName: Joi.string().required(),
    price: Joi.number().min(1).max(Number.MAX_SAFE_INTEGER).required(),
    inStock: Joi.boolean().required(),
    categories: Joi.array().items(Joi.string().required()).required(),
  }),
};

exports.FETCH_PRODUCTS = {
  query: Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
    productName: Joi.string().optional(),
    price: NUMBER_FIELD_VALIDATION
  }).unknown(true),
};

exports.FETCH_PRODUCT_BY_ID = {
  params: Joi.object({
    productId: PRODUCT_ID_VALIDATION,
  }),
};

exports.UPDATE_PRODUCT = {
  params: Joi.object({
    productId: PRODUCT_ID_VALIDATION,
  }),
  body: Joi.object({
    productName: Joi.string().optional(),
    price: Joi.number().min(1).max(Number.MAX_SAFE_INTEGER).optional(),
    inStock: Joi.boolean().optional(),
    categories: Joi.array().items(Joi.string().required()).optional(),
  }).not({}),
};

exports.DELETE_PRODUCT = {
  params: Joi.object({
    productId: PRODUCT_ID_VALIDATION,
  }),
};
