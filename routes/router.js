const express = require('express');

const Router = express.Router();
const { signUp, login, getUser } = require('./controllers/users');

/* USER */
// Router.get("/users/me", authMiddleware, httpGetUser);
Router.post("/signup", signUp);
Router.post("/login", login);
Router.get("/getUser", getUser);


module.exports = Router;