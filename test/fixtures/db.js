const mongoose = require('mongoose')
const AlertModel = require('../../src/alerts/alerts.model')
const HistoryModel = require('../../src/history/history.model')

const alertOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Fisrt alert",
  sensitivityDuration: 500,
  threshold: 12.4,
  triggersBelowThreshold: true,
  usesDesktopNotification: false,
  usesEmailNotification: false,
  usesSMSNotification: true,
}

const alertTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: "Second alert",
  sensitivityDuration: 300,
  threshold: 12.3,
  triggersBelowThreshold: true,
  usesDesktopNotification: false,
  usesEmailNotification: false,
  usesSMSNotification: true,
}

const alertThree = {
  _id: new mongoose.Types.ObjectId(),
  name: "Third alert",
  sensitivityDuration: 1000,
  threshold: 12.7,
  triggersBelowThreshold: false,
  usesDesktopNotification: false,
  usesEmailNotification: true,
  usesSMSNotification: true,
}

const omittedAlert = {
  _id: new mongoose.Types.ObjectId(),
  name: "Ommitted alert",
  sensitivityDuration: 1000,
  threshold: 12.7,
  triggersBelowThreshold: false,
  usesDesktopNotification: false,
  usesEmailNotification: true,
  usesSMSNotification: true,
}

const sensorMessageOne = {
  _id: new mongoose.Types.ObjectId(),
  batteryid: "123xyz",
  voltage: 12.4,
  createdAt: "2020-09-12T23:22:11.060Z"
}

const sensorMessageTwo = {
  _id: new mongoose.Types.ObjectId(),
  batteryid: "123xyz",
  voltage: 12.37,
  createdAt: "2020-09-12T23:22:12.060Z"
}

const sensorMessageThree = {
  _id: new mongoose.Types.ObjectId(),
  batteryid: "123xyz",
  voltage: 12.38,
  createdAt: "2020-09-12T23:22:13.060Z"
}


const seedDatabase = async () => {
  await AlertModel.deleteMany()
  await new AlertModel(alertOne).save()
  await new AlertModel(alertTwo).save()
  await new AlertModel(alertThree).save()

  await HistoryModel.deleteMany()
  await new HistoryModel(sensorMessageOne).save()
  await new HistoryModel(sensorMessageTwo).save()
  await new HistoryModel(sensorMessageThree).save()
}

module.exports = {
  alertOne,
  alertTwo,
  alertThree,
  omittedAlert,
  sensorMessageOne,
  sensorMessageTwo,
  sensorMessageThree,
  seedDatabase
}
