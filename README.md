# Express-challenge

Solution to the challenge

## Tech Stack

**Server:** Node, Express, JWT, MongoDB Atlas, Mongoose, express-validator, dotenv.

## API Reference

#### Get access token

```http
  POST /v1/user/login
```

Returns an access token used for creating, modifying and deleting tasks. **You must be authenticated before using the tasks endpoints**. The request body should contain the following

```javascript
{
  'username' //String *Required*
}
```

#### Get all Tasks

```http
  GET /v1/tasks
```

Returns the entire tasks collection

#### Get task by Id

```http
  GET /v1/tasks/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create new task

```http
  POST /v1/tasks
```

Creates a new task document. The request body must have this structure:

```javascript
{
  'name', //String *Required*
    'description', //String
    'completed' //Boolean
}
```

#### Update task

```http
  PUT /v1/tasks/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

Updates an existing task document. The request body must have this structure:

```javascript
{
  'name', //String *Required*
    'description', //String
    'completed' //Boolean
}
```

#### Delete a task

```http
  DELETE /v1/tasks/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`
`MONGO_URL`

Please generate the token secret by using Node.js’s built-in `crypto` library

```javascript
require('crypto').randomBytes(64).toString('hex')
```

## Test in Postman

[The Project's work environment](https://www.postman.com/mauriziodm/workspace/express-server-test)

## Installation

Install with npm

```bash
  npm install
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```
