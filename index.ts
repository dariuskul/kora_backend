import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { connectDb } from './db';
import router from './routes';
import fileUpload from 'express-fileupload';
import nodemailer from 'nodemailer';
import { AsyncTask, SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';
import { notify } from '@heroku-cli/notifications';
import multer from 'multer';
import { sendDailySummary } from './utils/report';
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
app.use(fileUpload());


const task = new AsyncTask(
  'simple task', 
  () => { return sendDailySummary()},
  (err: Error) => { /* handle error here */ });
//use it

const job = new SimpleIntervalJob({ days: 1 }, task)
scheduler.addSimpleIntervalJob(job)


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
