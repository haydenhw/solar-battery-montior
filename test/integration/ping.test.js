const request = require('supertest')
const app = require('../../src/app')
const mockMongoDb = require("../../src/mongodb/mongodb.mock.connect")

describe('ping endpoint', () => {
  beforeAll(async () => {
    await mockMongoDb.connect()
  });

  afterAll(async () => {
    mockMongoDb.closeDatabase()
  });

  test('returns pong message', async () => {
    const response = await request(app).get('/ping/')
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('pong')
  })
})


