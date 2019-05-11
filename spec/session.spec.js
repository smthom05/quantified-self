var shell= require('shelljs');
var request = require('supertest');
var app = require('../app');
var pry = require('pryjs');
var User = require('../models').User;

describe('Sessions API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:undo:all')
    shell.exec('npx sequelize db:seed:all')
  });

  // Meal Index Endpoint
  describe('Test POST /api/v1/sessions', () => {
    //first create a user
    test('should return a 200 status', () => {
      var body = {
                  'email': 'email@email122.com',
                  'password': 'password',
                  'password_confirmation': 'password'
                };

      return request(app).post('/api/v1/users').send(body).then(response => {
        expect(response.status).toBe(201);
      })
    })
    // login with email and password
    test('should return a 200 status', () => {
      var loginBody = {
                  'email': 'email@email122.com',
                  'password': 'password'
                };

      return request(app).post('/api/v1/sessions').send(loginBody).then(response => {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe('Login Successful');
      })
    })
  })
})
