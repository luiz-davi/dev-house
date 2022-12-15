import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import 'dotenv/config';


class App {
  constructor(){
    this.server = express();
    
    mongoose.set("strictQuery", true);
    mongoose.connect(`mongodb+srv://ravengar:${process.env.MONGO_PASSWORD}@cluster0.5bagg4g.mongodb.net/devhouse?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.set('strictQuery', true);

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }
}

export default new App().server;