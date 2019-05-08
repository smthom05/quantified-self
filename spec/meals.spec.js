var shell= require('shelljs');
var request = require('supertest');
var app = require('../app');
var pry = require('pryjs')


describe('Meals API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });

  // Meal Index Endpoint
  describe('Test GET /api/v1/meals', () => {
    test('should return a 200 status and all meals with their foods', () => {
      return request(app).get('/api/v1/meals').then(response => {
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(3)
        expect(Object.keys(response.body[0].Food[0])).toContain('id')
        expect(Object.keys(response.body[0].Food[0])).toContain('name')
        expect(Object.keys(response.body[0].Food[0])).toContain('calories')
        expect(response.body[0].name).toBe("Breakfast")
        expect(response.body[0].Food).toBeInstanceOf(Array)
      })
    })
  })

  // Specific Meal Show Endpoint
  describe('Test GET /api/v1/meals/1/foods', () => {
    test('should return a 200 status and meal and it\'s foods', () => {
      return request(app).get('/api/v1/meals/1/foods').then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.name).toBe("Breakfast")
        expect(response.body.id).toBe(1)
        expect(response.body.Food).toBeInstanceOf(Array)
        expect(Object.keys(response.body.Food[0])).toContain('id')
        expect(Object.keys(response.body.Food[0])).toContain('name')
        expect(Object.keys(response.body.Food[0])).toContain('calories')
      })
    })
    test('should return a 404 and error message if meal is not found', () => {
      return request(app).get('/api/v1/meals/16/foods').then(response => {
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Meal not found!!")
      })
    })
  })

  // Create MealFood Association Endpoint
  describe('Test POST /api/v1/meals/1/foods/7', () => {
    test('should return a 201 status and success message', () => {
      return request(app).post('/api/v1/meals/1/foods/7').then(response => {
        expect(response.status).toBe(201)
        expect(response.body.success).toBe("Successfully added Yogurt to Breakfast")
      })
    })
  })
});
