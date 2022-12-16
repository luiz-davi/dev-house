const  { Router } = require('express');
const SessionsController = require('./controllers/SessionsController');

const routes = new Router();

routes.post('/sessions', SessionsController.store);

module.exports = routes;