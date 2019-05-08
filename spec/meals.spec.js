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
});
