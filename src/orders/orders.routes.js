const express = require("express")
const router = express.Router()

const controller = require("./orders.controller")
const jwtVerify = require("../middlewares/jwt-verify")

router.get("/", jwtVerify, controller.getAllOrders)
router.post("/", jwtVerify, controller.createOrder)
router.get("/pending", jwtVerify, controller.getPendingOrders)
router.get("/history", jwtVerify, controller.getHistoryOrders)
router.get("/:orderId", jwtVerify, controller.getOrder)
router.post("/status/:orderId", jwtVerify, controller.changeOrderStatus)
module.exports = router
