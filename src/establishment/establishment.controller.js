const Establishment = require('./establishment.model');
const Product = require('../products/products.model');
const Order = require('../orders/orders.model');
const AccountValidation = require('../auth/account_validation.model');
const { encrypt } = require('../core/password_encrypter');
const {
  sendServerError,
  sendCreatedResponse,
  sendOkResponse,
  sendNotFoundResponse,
  sendNoContentResponse
} = require('../core/responses');
const { generateRandomHash } = require('../core/hasher');
const { sendValidationMail } = require('../core/mailer');

exports.deleteEstablishment = async (req, res) => {
  try {
    await Establishment.findOneAndDelete(req.params.id);
    sendNoContentResponse(res);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getEstablishment = async (req, res) => {
  try {
    const establishment = await Establishment.findById(
      req.params.establishmentId
    );
    if (!establishment) {
      sendNotFoundResponse(res, 'Establishment not found');
      return;
    }
    sendOkResponse(res, establishment);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getMyInfo = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await Establishment.findById(id);
    if (!user) {
      sendNotFoundResponse(res);
      return;
    }
    sendOkResponse(res, user);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.createEstablishment = async (req, res) => {
  const { name, username, password, email, lat, lng, plusCode } = req.body;
  try {
    const hashedPassword = await encrypt(password);
    const newEstablishment = new Establishment();
    newEstablishment.name = name;
    newEstablishment.username = username;
    newEstablishment.password = hashedPassword;
    newEstablishment.email = email;
    newEstablishment.lat = lat;
    newEstablishment.lng = lng;
    newEstablishment.plusCode = plusCode;

    const establishmentCreated = await newEstablishment.save();
    const accountValidation = new AccountValidation();
    const hash = generateRandomHash();
    accountValidation.hash = hash;
    accountValidation.account_type = 'establishment';
    accountValidation.userId = establishmentCreated._id;
    accountValidation.save();

    // mandar mail
    sendValidationMail(establishmentCreated.email, hash)
      .then(() => {
        console.log(`mail sent to ${establishmentCreated.email}`);
      })
      .catch(error => {
        console.log(error);
      });

    sendCreatedResponse(res, establishmentCreated);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getEstablishments = async (req, res) => {
  try {
    const establishments = await Establishment.find();
    sendOkResponse(res, establishments);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getEstablishmentProducts = async (req, res) => {
  const { establishmentId } = req.params;
  try {
    const establishmentProducts = await Product.find({ establishmentId });
    sendOkResponse(res, establishmentProducts);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getMyProducts = async (req, res) => {
  const { id } = req.user;
  try {
    const establishmentProducts = await Product.find({
      establishmentId: id
    }).populate('tags');
    sendOkResponse(res, establishmentProducts);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getEstablishmentOrders = async (req, res) => {
  const { establishmentId } = req.params;
  try {
    const establishmentOrders = await Order.find({ establishmentId });
    sendOkResponse(res, establishmentOrders);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getMyOrders = async (req, res) => {
  const { id } = req.user;
  try {
    const establishmentOrders = await Order.find({ establishmentId: id });
    sendOkResponse(res, establishmentOrders);
  } catch (e) {
    sendServerError(res, e);
  }
};
