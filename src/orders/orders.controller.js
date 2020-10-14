const Order = require('./orders.model');
const { sendServerError } = require('../core/responses');
const { statusTypes } = require('./orders_status.enum');
const {
  sendCreatedResponse,
  sendNotFoundResponse,
  sendOkResponse
} = require('../core/responses');

exports.createOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    let newOrder = new Order();
    newOrder.name = req.body.name;
    newOrder.table = req.body.table;
    newOrder.products = req.body.products;
    newOrder.userId = userId;
    newOrder.establishmentId = req.body.establishmentId;

    let order = await newOrder.save();
    order = await order.populate('products').execPopulate();

    require('../app').io.emit('order-created', order);
    sendCreatedResponse(res, order);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('products');
    if (!order) {
      sendNotFoundResponse(res, 'Order not found');
      return;
    }
    sendOkResponse(res, order);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    sendOkResponse(res, orders);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getPendingOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find({
      status: { $ne: statusTypes.FINISHED }
    }).populate('products');
    sendOkResponse(res, pendingOrders);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.getLatestOrders = async (req, res) => {
  try {
    const pendingOrders = await Order.find().populate('products establishmentId');
    sendOkResponse(res, pendingOrders);
  } catch (e) {
    sendServerError(res, e);
  }
};

exports.changeOrderStatus = async (req, res) => {
  try {
    let order = await Order.findById(req.params.orderId);
    order.status = req.body.status;
    order = await order.save();
    sendOkResponse(res, order);
  } catch (e) {
    sendServerError(res, e);
  }
};
