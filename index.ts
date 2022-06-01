import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDb } from './db';
import router from './routes';
import fileUpload from 'express-fileupload';
import { AsyncTask, SimpleIntervalJob, Task, ToadScheduler } from 'toad-scheduler';
import { sendDailySummary } from './utils/report';
import { calculateData, calculateValues } from './services/internal/scheduler';
const scheduler = new ToadScheduler()

// Object
const app: express.Application = express();

const port = process.env.PORT || 3000;

connectDb();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use(fileUpload());


const task = new AsyncTask(
  'simple task',
  () => { return sendDailySummary() },
  (err: Error) => { /* handle error here */ });

const task2 = new AsyncTask('stop timers', () => calculateData(), (err: Error) => { /* handle error here */ });

const job = new SimpleIntervalJob({ seconds: 99999 }, task)
const job2 = new SimpleIntervalJob({ seconds: 1 }, task2)

scheduler.addSimpleIntervalJob(job)
scheduler.addSimpleIntervalJob(job2);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
