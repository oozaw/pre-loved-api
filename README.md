# Pre Loved API

## Description
Pre loved is a platform where users can sell and buy second hand items. This API is the backend of the application. It is built with Node.js, NestJs, and PostgreSQL.

## Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Create a .env file and add the following environment variables
```bash
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/pre-loved
JWT_SECRET=secret
```
4. Run the application
```bash
npm run start:dev
```

## API Documentation

### Base URL
```bash
http://localhost:3000/api
```

<!-- Register -->
### Register

#### Request
- Method: POST
- Endpoint: `/auth/register`
- Headers:
  - Content-Type: `application/json`
  - Accept: `application/json`
- Body:
```json
{
    "email": "",
    "password": "",
    "name": ""
}
```
- Response:
```json
{
  "status": true,
  "message": "User created successfully",
  "data": {
    "name": "John Doe",
    "email": "jhondoe@email.com"
  }
}
```

<!-- Login -->
### Login

#### Request
- Method: POST
- Endpoint: `/auth/login`
- Headers:
  - Content-Type: `application/json`
  - Accept: `application/json`
- Body:
```json
{
    "email": "",
    "password": "",
}
```
- Response:
```json
{
  "status": true,
  "message": "User logged in successfully",
  "data": {
    "name": "John Doe",
    "email": "jhondoe@email.com"
  }
}
```

<!-- Update User Info -->
### Update User Info

#### Request
- Method: POST
- Endpoint: `/auth/update`
- Headers:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `Bearer <token>`
- Body:
```json
{
  "name": "",
  "email": "",
  "password": "",
  "phone": "",
  "address": "",
  "city": "",
  "state": "",
  "country": "",
  "zip": ""
}
```
- Response:
```json
{
  "status": true,
  "message": "User updated successfully",
  "data": {
    "name": "John Doe",
    "email": "jhondoe@email.com",
    "phone": "",
    "address": "",
    "city": "",
    "state": "",
    "country": "",
    "zip": ""
  }
}
```

<!-- Get User Info -->
### Get User Info

#### Request
- Method: GET
- Endpoint: `/auth/detail`
- Headers:
  - Content-Type: `application/json`
  - Accept: `application/json`
  - Authorization: `Bearer <token>`
- Response:
```json
{
  "status": true,
  "message": "User details fetched successfully",
  "data": {
    "name": "John Doe",
    "email": "jhondoe@email.com",
    "phone": "",
    "address": "",
    "city": "",
    "state": "",
    "country": "",
    "zip": ""
  }
}
```