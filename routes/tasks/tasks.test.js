const request = require('supertest')
const app = require('../../app')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect()
  })

  afterAll(async () => {
    await mongoDisconnect()
  })

  const token = jwt.sign({ userId: '123' }, process.env.JWT_SECRET)

  //GET /v1/tasks
  describe('test GET /v1/tasks', () => {
    test('if it responds with 200 success', async () => {
      const response = await request(app)
        .get('/v1/tasks')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
    })

    test('if it responds with 401 unathorized', async () => {
      const response = await request(app).get('/v1/tasks').expect(401)
      expect(response.body.message).toBe('Forbidden Access')
    })
  })

  //GET /v1/tasks/:id

  describe('test GET /v1/tasks/:id', () => {
    test('if it returns a single task by id', async () => {
      const response = await request(app)
        .get('/v1/tasks/641a34148f5da39305a399dd')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200)
    })

    test('if it responds with 401 unathorized', async () => {
      const response = await request(app)
        .get('/v1/tasks/641a34148f5da39305a399dd')
        .expect(401)
      expect(response.body.message).toBe('Forbidden Access')
    })

    test('if id is not valid', async () => {
      const response = await request(app)
        .get('/v1/tasks/23546324')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
      expect(response.body.message).toBe('Invalid task ID')
    })

    test('if task is not found', async () => {
      const response = await request(app)
        .get('/v1/tasks/641cf406b0ba3f37d8ef8212')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(404)
      expect(response.body.message).toBe('Task not found')
    })
  })

  //POST /v1/tasks/

  describe('test POST v1/tasks', () => {
    const completeTaskData = {
      name: 'testing',
      description: 'making integration tests',
      completed: false,
    }

    const taskDataWithoutCompleted = {
      name: 'testing',
      description: 'making integration tests',
    }

    const invalidTask = {
      description: 'making integration tests',
      completed: false,
    }

    test('it should respond with 201 created', async () => {
      const response = await request(app)
        .post('/v1/tasks')
        .send(taskDataWithoutCompleted)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(201)

      expect(response.body).toMatchObject(completeTaskData)
    })

    test('it should respond with 401 unauthorized', async () => {
      const response = await request(app)
        .post('/v1/tasks')
        .send(completeTaskData)
        .expect('Content-Type', /json/)
        .expect(401)
      expect(response.body.message).toBe('Forbidden Access')
    })

    test('it should catch missing properties', async () => {
      const response = await request(app)
        .post('/v1/tasks')
        .send(invalidTask)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(400)

      expect(response.body.errors[0]).toStrictEqual({
        msg: 'Invalid value',
        param: 'name',
        location: 'body',
      })

      expect(response.body.errors[1]).toStrictEqual({
        msg: 'Name is required and must be a string',
        param: 'name',
        location: 'body',
      })
    })
  })
})

//TODO TEST FOR PUT AND DELETE
