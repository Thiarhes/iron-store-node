# IRON STORE Api

---

## Api for IRON STORE e-commerce 

IRON STORE Api is an express rest api used to manage e-commerce.

---

## Some Features

- Create users (with shopping cart)
- Create products and manage them
- Manage shopping cart

This api was created to manage all endpoints used on the third Ironhack's project remote bootcamp - **IRON STORE**.
Create by **Thiarhes Gonçalves**

---

## Techs

- Node.js
- Express.js

---

## Installation

Clone this repo and 
in the source folder, add an .env file with this variables:

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

| METHOD | ENDPOINT | PAYLOAD | RESPONSE | ACTION |  |
| --- | --- | --- | --- | --- | --- |
| POST | /signup | {"username":String, "email":String, "password":String} | - | Create new a new user with cart |  |
| POST | /login | {"email":String, "password":String} | Auth token on Headers | Return JWT to private routes |  |
| PATCH | /edit/:id | {"username":String, "email":String, "password":String} | {user} | Update a existing user |  |
| DELETE | /delete/:id | {user:user_id} | - | Delete a user |  |
| GET | /products | - | [products] | Get all products from DB |  |
| GET | /products/:id | - | {product} | Get one product by id |  |
| POST | /products | {"title":String, "price":Number, "description":String, "image":String, "category":String} | {product} | Create new product |  |
| DELETE | /products/:id | - | - | Delete a product |  |
| PATCH | /products/:id | {"title":String, "price":Number, "description":String, "image":String, "category":String} | {product} | Update a existing product |  |
| POST | /cart | {user_id, product_id} | {cart} | Add product to cart |  |
| GET | /cart/:userId | {user:user_id} | {cart} | Get one cart by user id |  |
| POST | /cart/removeProd | {user_id, product_id} | {cart} | Remove one product from cart |  |
| PUT | /cart | {user_id} | - | Remove all products from cart |  |
