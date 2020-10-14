const request = require('supertest')
const app = require('../../src/app')
const mockMongoDb = require("../../src/mongodb/mongodb.mock.connect")
const {
  sensorMessageThree,
  seedDatabase,
} = require('../fixtures/db')


beforeAll(async () => {
  await mockMongoDb.connect()
});

afterAll(async () => {
  mockMongoDb.closeDatabase()
});

beforeEach(seedDatabase)

const ENDPOINT_URL = '/history'

test('Should return most recent datapoint', async () => {
  const response = await request(app).get(ENDPOINT_URL + '/latest/1')
  expect(response.statusCode).toBe(200)
  expect(response.body.payload.length).toBe(1)
  expect(response.body.payload[0].createdAt).toStrictEqual(sensorMessageThree.createdAt)
})

test('Should return two datapoints', async () => {
  const response = await request(app).get(ENDPOINT_URL + '/latest/2')
  expect(response.statusCode).toBe(200)
  expect(response.body.payload.length).toBe(2)
  expect(response.body.payload[0].createdAt).toStrictEqual(sensorMessageThree.createdAt)
})
