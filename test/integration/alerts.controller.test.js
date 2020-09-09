const request = require('supertest')
const app = require('../../src/app')
const mockMongoDb = require("../../src/mongodb/mongodb.mock.connect")
const newAlert = require('../mock-data/new-alert.json')
const {
    alertOne,
    alertTwo,
    alertThree,
    omittedAlert,
    seedDatabase,
} = require('../fixtures/db')

const endpointUrl = '/alerts'

describe(endpointUrl, () => {
  beforeAll(async () => {
    await mockMongoDb.connect()
  });

  afterAll(async () => {
    mockMongoDb.closeDatabase()
  });

  beforeEach(seedDatabase)

  test('Should return a list of alerts', async () => {
    const response = await request(app).get(endpointUrl)
    expect(response.statusCode).toBe(200)
    expect(response.body.payload).toHaveLength(3)
    expect(response.body.payload[0].name).toEqual(alertOne.name)
    expect(response.body.payload[1].name).toEqual(alertTwo.name)
    expect(response.body.payload[2].name).toEqual(alertThree.name)
  })

  test('Should create new alert', async () => {
    const response = await request(app).post(endpointUrl).send(newAlert)
    expect(response.statusCode).toBe(201)
    expect(response.body.payload.name).toEqual(newAlert.name)
    expect(response.body.payload.threshold).toEqual(newAlert.threshold)
  })

  test('Should update alert by id', async () => {
    const updates = { name: 'updated name', threshold: 12.89999 }
    const response = await request(app).patch(`${endpointUrl}/${alertOne._id}`).send(updates)
    expect(response.statusCode).toBe(200)
    expect(response.body.payload.name).toEqual(updates.name)
    expect(response.body.payload.threshold).toEqual(updates.threshold)
  })

  test('Should return 400 response if invalid update is supplied', async () => {
    const updates = { name: 'updated name', threshold: 12.89999, invalidUpdate: true }
    const response = await request(app).patch(`${endpointUrl}/${alertOne._id}`).send(updates)
    expect(response.statusCode).toBe(400)
  })

  test('Should return 404 response if alert does not exist', async () => {
    const updates = { name: 'updated name', threshold: 12.89999 }
    const response = await request(app).patch(`${endpointUrl}/${omittedAlert._id}`).send(updates)
    expect(response.statusCode).toBe(404)
  })

  test('Should delete alert by id', async () => {
    const response = await request(app)
      .delete(`${endpointUrl}/${alertOne._id}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.payload.name).toStrictEqual(alertOne.name)
  })
})



















