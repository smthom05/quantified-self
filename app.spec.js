var shell = require('shelljs');
var request = require('supertest');
var app = require('./app');
var pry = require('pryjs')

describe('Foods API', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });

  describe('Test /api/v1/foods/1', () => {
    test('should return status 200 and specific food object', () => {
      return request(app).get('/api/v1/foods/1').then(response => {
        expect(response.status).toBe(200)
      })
    })
  })
})
