import exp from 'constants';

import 'dotenv/config';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express();

    mongoose.set('strictQuery', true);
    mongoose.connect(`mongodb+srv://ravengar:${process.env.MONGO_PASSWORD}@cluster0.5bagg4g.mongodb.net/devhouse?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
