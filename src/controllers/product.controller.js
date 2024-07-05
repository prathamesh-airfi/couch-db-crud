const createError = require("http-errors");

const couch = require("../db/couch");
const { getSuccesssResponse } = require("../utils/response.util");

exports.addProduct = async (req, res, next) => {
  try {
    const payload = req.body;

    const product = await (await couch).insert(payload, payload.productId);

    return res.json(
      getSuccesssResponse("Product created successfully.", { product })
    );
  } catch (error) {
    next(error);
  }
};

exports.fetchProducts = async (req, res, next) => {
  try {
    const { productName = '' } = req.query;
    const { page = 1, limit = 10 } = req.query;

    let queryObject = { ...req.query };

    /* Basic Filtration */
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((item) => delete queryObject[item]);

    /* Advance Filtering */
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    queryObject = JSON.parse(queryString);

    /* Search on the basis of productName of product */
    if (productName) {
      queryObject.productName = { $regex: `.*${productName}*.` };
    }

    /* Limit the fields */
    let fields = [];
    if (req.query.fields) {
      fields = [
        "_id",
        "_rev",
        ...req.query.fields.split(", ").map((f) => f.trim()),
      ];
    }

    /* Pagination */
    const skip = (page - 1) * limit;

    const totalRecords = (await (await couch).find({ selector: queryObject }))
      .docs.length;

    if (skip > totalRecords) {
      throw createError.NotFound(`Page doesn't exists!`);
    }

    /* Final Query */
    const { docs: products } = await (
      await couch
    ).find({ selector: queryObject, skip, limit, fields });

    return res.json(
      getSuccesssResponse("Products fetched successfully.", {
        page,
        limit,
        products,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.fetchProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      docs: [product],
    } = await (await couch).find({ selector: { _id: productId } });

    if (!product) {
      throw createError.NotFound(
        `Product with ${productId} id doesn't exists.`
      );
    }

    return res.json(
      getSuccesssResponse("Product fetch successfully.", { product })
    );
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const payload = req.body;

    const {
      docs: [existingProduct],
    } = await (await couch).find({ selector: { _id: productId } });

    if (!existingProduct) {
      throw createError.NotFound(
        `Product with ${productId} id doesn't exists.`
      );
    }

    const updatePayload = {
      ...existingProduct,
      ...payload,
    };

    const product = await (await couch).insert(updatePayload, productId);

    return res.json(
      getSuccesssResponse(`Product with ${productId} updated successfully.`, {
        product,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const {
      docs: [existingProduct],
    } = await (await couch).find({ selector: { _id: productId } });

    if (!existingProduct) {
      throw createError.NotFound(
        `Product with ${productId} id doesn't exists.`
      );
    }

    await (await couch).destroy(productId, existingProduct._rev);

    return res.json(
      getSuccesssResponse(`Product with ${productId} id deleted successfully.`)
    );
  } catch (error) {
    next(error);
  }
};
