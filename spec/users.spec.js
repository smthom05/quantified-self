var shell= require('shelljs');
var request = require('supertest');
var app = require('../app');
var pry = require('pryjs');
var User = require('../models').User;

describe('Users API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    // shell.exec('npx sequelize db:seed:all')
  });

  // Meal Index Endpoint
  describe('Test POST /api/v1/users', () => {
    test('should return a 201 status', () => {
      var body = {
                  'email': 'email@email.com',
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
                  'email': 'email@email.com',
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
                  'email': 'email@email.com',
                  'password': 'password',
                  'password_confirmation': 'password'
                };

      return request(app).post('/api/v1/users').send(body).then(response => {
        expect(response.status).toBe(500);
      })
    })
  })

})
