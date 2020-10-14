const request = require('supertest')
const app = require('../../src/app')
const mockMongoDb = require("../../src/mongodb/mongodb.mock.connect")
const sensorMessage = require('../mock-data/battery-sensor-message.json')
const ENDPOINT_URL = '/messages'

beforeAll(async () => {
  await mockMongoDb.connect()
});

afterAll(async () => {
  mockMongoDb.closeDatabase()
});

test('Should check for alerts and save message', async () => {
  const response = await request(app).post(ENDPOINT_URL).send(sensorMessage)
  expect(response.statusCode).toBe(201)
  expect(response.body.payload.voltage).toStrictEqual(sensorMessage.voltage)
})
