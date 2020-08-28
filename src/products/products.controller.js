const Product = require('./products.model');
const {
  sendServerError,
  sendCreatedResponse,
  sendOkResponse,
  sendNotFoundResponse,
  sendNoContentResponse
} = require('../core/responses');
const awsService = require('../core/awsService');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('tags');
    sendOkResponse(res, products);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.createProduct = async (req, res) => {
  const establishmentId = req.user.id;
  try {
    let newProduct = new Product();
    const image = await awsService.imageUpload(req.body.image);
    newProduct.title = req.body.title;
    newProduct.price = req.body.price;
    newProduct.image = image;
    newProduct.tags = req.body.tags;
    newProduct.establishmentId = establishmentId;
    let productCreated = await newProduct.save();
    productCreated = await productCreated.populate('tags').execPopulate();
    sendCreatedResponse(res, productCreated);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      sendNotFoundResponse(res, 'Product not found');
      return;
    }
    sendOkResponse(res, product);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete(req.params.id);
    sendNoContentResponse(res);
  } catch (e) {
    sendServerError(res, e);
  }
};
