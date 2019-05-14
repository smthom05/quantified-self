var shell= require('shelljs');
var request = require('supertest');
var app = require('../app');
var pry = require('pryjs');
var User = require('../models').User;

describe('Users API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:seed:all')
  });

  // Meal Index Endpoint
  describe('Test POST /api/v1/users', () => {
    test('should return a 201 status', () => {
      var body = {
                  'email': 'email55@email.com',
                  'password': 'password',
                  'password_confirmation': 'password'
                };

      return request(app).post('/api/v1/users').send(body).then(response => {
        expect(response.status).toBe(201);
        expect(response.body.success).toBe('Account Created');
      })
    })

    test('should return a 401 status if passwords do not match', () => {
      var body = {
                  'email': 'email155@email.com',
                  'password': 'passsssword',
                  'password_confirmation': 'password'
                };

      return request(app).post('/api/v1/users').send(body).then(response => {
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Passwords Do Not Match');
      })
    })

    test('should return a 500 status if email is not unique', () => {
      var body = {
                  'email': 'email@email1.com',
                  'password': 'password',
                  'password_confirmation': 'password'
                };

      return request(app).post('/api/v1/users').send(body).then(response => {
        expect(response.status).toBe(500);
      })
    })
  })

  describe('Test POST /api/v1/users/1/meals/1', () => {
    test('should return a 201 status and success message', () => {
      return request(app).post('/api/v1/users/1/meals/1').then(response => {
        expect(response.status).toBe(201);
        expect(response.body.success).toBe('UserMeal Successfully Created');
      })
    })

    test('should return a 401 status if UserMeal not created', () => {
      return request(app).post('/api/v1/users/1/meals/122').then(response => {
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('UserMeal Not Created');
      })
    })
  });

// Can Get All User Meals
  describe('Test GET /api/v1/users/1/meals', () => {
    test('should return a 200 status and meal objects', () => {
      return request(app).get('/api/v1/users/1/meals').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
      })
    })

    test('should return a 401 status if request is unsuccessful', () => {
      return request(app).get('/api/v1/users/144/meals').then(response => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Invalid Request');
      })
    })
  });
});
