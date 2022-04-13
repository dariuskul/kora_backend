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

// // const job = new SimpleIntervalJob({ seconds: 500, }, task);

// scheduler.addSimpleIntervalJob(job)

const SEND_INTERVAL = 2000;

const writeEvent = (res: Response, sseId: string, data: string) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req: Request, res: Response) => {
  res.writeHead(200, {
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
  });

  const sseId = new Date().toDateString();

  setInterval(() => {
    writeEvent(res, sseId, JSON.stringify('haha'));
  }, SEND_INTERVAL);

  writeEvent(res, sseId, JSON.stringify('haha'));
};

app.get('/test', (req: Request, res: Response) => {
  if (req.headers.accept === 'text/event-stream') {
    sendEvent(req, res);
  } else {
    res.json({ message: 'Ok' });
  }
});


//use it


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});