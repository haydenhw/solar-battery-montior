const request = require('supertest')
const app = require('../../src/app')
const newVoltage = require('../mock-data/voltage-reading.json')
const endpointUrl = '/sensors'

test('Should ', async () => {
  const response = await request(app).post(endpointUrl).send(newVoltage)
  expect(response.statusCode).toBe(200)
})
