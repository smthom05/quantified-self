var shell= require('shelljs');
var request = require('supertest');
var app = require('../app');
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

        expect(response.status).toBe(200),
        expect(response.body).toBeInstanceOf(Object),
        expect(Object.keys(response.body)).toContain('id'),
        expect(Object.keys(response.body)).toContain('name'),
        expect(Object.keys(response.body)).toContain('calories')
      })
    })
  });

  describe('Test POST /api/v1/foods', () => {
    test('should return status 201 and new food item object', async () => {
      const body =  {
                      "food": {
                              "name":  "Mentos",
                              "calories": "14"
                              }
                    }

       await request(app).post('/api/v1/foods').send(body)
       .then(async response => {
         await expect(response.status).toBe(201),
         await expect(response.body.calories).toBe(14),
         await expect(response.body.name).toBe("Mentos"),
         await expect(response.body).toBeInstanceOf(Object)
       })
    });
  });

// Update food
  describe('Test PATCH /api/v1/foods/1', () => {
    test('should return status 200 and original food object', async () => {
      await request(app).get('/api/v1/foods/1').then(async response => {
      await expect(response.status).toBe(200),
      await expect(response.body).toBeInstanceOf(Object),
      await expect(response.body.name).not.toBe("Mint"),
      await expect(response.body.calories).not.toBe(14)
      })
    });

    //Now we update below
    test('should return status 200 and updated food item object', async () => {
      const body =  {
        "food": {
          "name":  "Mint",
          "calories": 14
        }
      }

      await request(app).patch('/api/v1/foods/1').send(body)
      .then(async response => {
        await expect(response.status).toBe(201),
        await expect(response.body.calories).toBe(14),
        await expect(response.body.name).toBe("Mint"),
        await expect(response.body).toBeInstanceOf(Object)
      })
    });
  });

  // Delete Food
    describe('Test DELETE /api/v1/foods/1', () => {
      test('should return status 204', async () => {
        await request(app).get('/api/v1/foods/1').then(async response => {
        await expect(response.status).toBe(200),
        await expect(response.body).toBeInstanceOf(Object),
        await expect(response.body.name).toBe("Mint"),
        await expect(response.body.calories).toBe(14)
        })
      });

      // Now we Delete
      test('should return status 201 and success message', async () => {
        await request(app).delete('/api/v1/foods/1')
        .then(async response => {
          await expect(response.status).toBe(201)
          await expect(response.body.success).toBe("Food Deleted")
        })
      });

      test('should return status 400 if food does not exist', async () => {
        await request(app).delete('/api/v1/foods/1')
        .then(async response => {
          await expect(response.status).toBe(400)
          await expect(response.body.error).toBe("Food Not Found")
        })
      });
    });
});
