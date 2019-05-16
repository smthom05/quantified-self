# Quantified Self

### Introduction
Quantified Self is a Mod 4 Project at the Turing School of Design. It is designed to act as an API micro-service for a calorie tracking app. A user can create an account and track their total calories for each meal they've consumed.

### Local Setup
1. `Clone` down this repo
1. `cd` into quantified-self
1. Run `npm install`

### How To Use
1. Run `npm start`
1. Use Postman or go to `localhost:3001` to hit the endpoints

### API Endpoints
**Account Creation**

  - `POST /api/v1/users`


  _Request_


    body:
        {
          "email": "my_email@example.com",
          "password": "password"
          "password_confirmation": "password"
        }


   _Response_


    status: 201
    body:
        {
          "user": {
              "id": 1,
              "email": "my_email@example.com"
          }
        },
    "success": "Account Created"


**Login Account**

  - `POST /api/v1/sessions`


  _Request_


    body:
        {
          "email": "my_email@example.com",
          "password": "password"
        }


 _Response_


    status: 201
    body:
        {
          "user": {
              "id": 1,
              "email": "my_email@example.com"
          }
        },
    "success": "Login Successful"

**All Foods**

  - `GET /api/v1/foods`

  _Response_


    status: 200
    body:
    [
      {
         "id": 1,
         "name": "Banana",
         "calories": 150
      },
      {
         "id": 2,
         "name": "Hamburger",
         "calories": 700
      },
      {
         "id": 3,
         "name": "Yogurt",
         "calories": 200
      }
    ]

**One Food**

- `GET /api/v1/foods/:food_id`

  _Response_


    status: 200
    body:
    [
      {
         "id": 1,
         "name": "Banana",
         "calories": 150
      }
    ]

**Create Food**

  - `POST /api/v1/foods/`

  _Request_


    body:
        {
          "name": "Cheeseburger",
          "calories": 900
        }

_Response_


      status: 201
      body:
      [
        {
           "id": 4,
           "name": "Cheesburger",
           "calories": 900
        }
      ]

**Edit Food**

  - `PATCH /api/v1/foods/:food_id`


  _Request_


    body:
        {
          "name": "New Cheeseburger",
          "calories": 1050
        }


  _Response_


    status: 201
    body:
    [
      {
         "id": 4,
         "name": "New Cheesburger",
         "calories": 1050
      }
    ]

**Delete Food**

  - `DELETE /api/v1/foods/:food_id`

  _Response_


      status: 204
      body:
      []
      'success': 'Food Successfully Deleted'


**All Meals**

  - `GET /api/v1/meals`


  _Response_


    status: 200
    [
      {
        "id": 1,
        "name": "Breakfast",
        "Food": [
            {
                "id": 1,
                "name": "food1",
                "calories": 50
            },
            {
                "id": 5,
                "name": "Banana",
                "calories": 150
            }
        ],
        "totalCalories": 200
      },
      {
        "id": 3,
        "name": "Dinner",
        "Food": [
            {
                "id": 2,
                "name": "food2",
                "calories": 50
            }
        ],
        "totalCalories": 50
      },
      {
        "id": 2,
        "name": "Lunch",
        "Food": [],
        "totalCalories": 0
      }
    ]

**One Meals**

  - `GET /api/v1/meals/:meal_id`


  _Response_

    status: 200

    [
      {
        "id": 1,
        "name": "Breakfast",
        "Food": [
            {
                "id": 1,
                "name": "food1",
                "calories": 50
            },
            {
                "id": 5,
                "name": "Banana",
                "calories": 150
            }
          ],
          "totalCalories": 200
      }
    ]


### Testing
Testing is done with the Jest testing framework. To test locally, run:

`nmp test`

To get back our coverage, run:

`npm test -- --coverage`


### Tech Stack
  - JavaScript
  - Node
  - Express
  - Sequelize

### Core Contributors
Scott Thomas & Manoj Panta
