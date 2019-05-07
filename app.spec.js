var shell= require('shelljs');
var request = require('supertest');
var app = require('./app');
var pry = require('pryjs')


describe('Foods API', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });

  describe ('Test route path', () => {
    test('should return a 200 status', ()=> {
      return request(app).get('/').then(response=> {
        expect(response.status).toBe(200)
      })
    })
  });

  describe('Test Foods Index Path', () => {
    test('should return a 200 status when requesting get api/v1/foods', ()=> {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.status).toBe(200)
      })
    })

    test('should return all the foods wheh  get api/v1/foods', ()=> {
      return request(app).get('/api/v1/foods').then(response => {
        expect(response.body.length).toBe(7),
        expect(Object.keys(response.body[0])).toContain('id'),
        expect(Object.keys(response.body[0])).toContain('name'),
        expect(Object.keys(response.body[0])).toContain('calories')
      })
    });
  })

  describe('Test /api/v1/foods/1', () => {
    test('should return status 200 and specific food object', () => {
      return request(app).get('/api/v1/foods/1').then(response => {

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(Object.keys(response.body)).toContain('id')
        expect(Object.keys(response.body)).toContain('name')
        expect(Object.keys(response.body)).toContain('calories')
      })
    })
  });

  describe('Test POST /api/v1/foods', () => {
    test('should return status 201 and new food item object', async () => {
      const body =  {
                      "food": {
                              "name":  "Name of food here",
                              "calories": "Calories here"
                              }
                    }

      try {
       await request(app).post('/api/v1/foods').send(body)
       .then(response => {
         expect(response.status).toBe(201);
         expect(response.body).toBeInstanceOf(Object)
         expect(Object.keys(response.body)).toContain('id')
         expect(Object.keys(response.body)).toContain('name')
         expect(Object.keys(response.body)).toContain('calories')
       })
      } catch (err) {
       console.log(`Error ${err}`)
     }
   });
 });
});
