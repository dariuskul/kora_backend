import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectDb } from './db';
import router from './routes';
import nodemailer from 'nodemailer';
import { AsyncTask, SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';
const notifier = require('node-notifier');
const scheduler = new ToadScheduler()

// Object
const app: express.Application = express();

const port = process.env.PORT || 3000;

connectDb();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kora',
      version: '1.0.0',
      description: 'Kora API'
    },
    servers: [{
      url: 'http://localhost:3000'
    }]
  },
  apis: ['./routes/users.js']
};

const specs = swaggerJsDoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const task = new Task(
  'task',
  () => {
    notifier.notify({
      title: 'My notification',
      message: 'Hello, there!xx'
    });
  }
)
const job = new SimpleIntervalJob({ seconds: 500, }, task);

scheduler.addSimpleIntervalJob(job)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});