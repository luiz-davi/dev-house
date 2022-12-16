const  { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionsController = require('./controllers/SessionsController');
const CasasController = require('./controllers/CasasController');

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionsController.store);
routes.post('/casas', upload.single('capa'), CasasController.store);

module.exports = routes;