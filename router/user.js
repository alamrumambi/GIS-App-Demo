const users = require('express').Router();
const { use } = require('.');
const Controller = require('../Controllers/userController');

users.post('/login', Controller.login);

module.exports = users;