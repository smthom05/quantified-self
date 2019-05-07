var shell= require('shelljs');
var request = require('supertest');
var app = require('./app');


describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })

  describe ('Test route path', () => {
    test('should return a 200 status', ()=> {
      return request(app).get('/').then(response=> {
        expect(response.status).toBe(200)
      })
    })
    test('should return a 200 status when requesting get api/v1/foods', ()=> {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.status).toBe(200)
      })
    })

    test('should return all the foods wheh  get api/v1/foods', ()=> {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.body.length).toBe(4),
        expect(Object.keys(response.body[0])).toContain('name'),
        expect(Object.keys(response.body[0])).toContain('calories')
      })
    })

  })
})
