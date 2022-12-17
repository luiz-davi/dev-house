const  { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionsController = require('./controllers/SessionsController');
const CasasController = require('./controllers/CasasController');
const DashboardController = require('./controllers/DashboardController');

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionsController.store);

routes.get('/casas', CasasController.index);
routes.get('/casas/:id', CasasController.show);
routes.post('/casas', upload.single('capa'), CasasController.store);
routes.put('/casas/:id', upload.single('capa'), CasasController.update);
routes.delete('/casas/:id', CasasController.destroy);

routes.get('/dashboard', DashboardController.houses);


module.exports = routes;