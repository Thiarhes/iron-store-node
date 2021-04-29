# IRON STORE Api

---

## Api for IRON STORE e-commerce 

IRON STORE Api is an express rest api used to manage e-commerce.

---

## Some Features

- Create users
- Create products and manage them
- Create shopping cart

This api was created to manage all endpoints used on the third Ironhack's project remote bootcamp - **IRON STORE**.
Create by **Thiarhes Gonçalves**

---

## Techs

- Node.js
- Express.js

---

## Installation

Clone this repo
In the source folder, add an .env file with this variables:

- MONGODB_URI      - for your atlas cluster or local mongodb.
- SECRET_JWT       - for your jwt secret.
- EXPIRATION_TOKEN - for setting the expiration time for jwt.

---

## Dependencies and Dev-Dependencies

```sh
- npm i       - to install dependencies
- npm run dev - to start the server
```

---

## You can test:

- on local   -  **`http://localhost:5000`**
- on heroku  -  **`https://iron-store-node.herokuapp.com/`**

---

## ENDPOINTS

- All endpoints except /auth need to be accessed with token on Authorization header.
- The common endpoints are the following:

| METHOD | ENDPOINT               | PAYLOAD               | RESPONSE               | ACTION               |
| ------ | ---------------------- | --------------------- | ---------------------- | -------------------- |
|     