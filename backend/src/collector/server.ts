import dotenv from 'dotenv'
import cors from 'cors';
import express from 'express'
import { Request, Response } from 'express'
import logger from '../shared/logger'
import { compute, getTasks } from './routes/compute'
import { clearTasks } from './routes/compute'
import redisClient from '../shared/redis';

dotenv.config()

const app = express()
const port = process.env.COLLECTOR_PORT

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:4173'
}));

app.post('/compute', compute)
app.get('/tasks', getTasks)
app.delete('/tasks', clearTasks)

;(async () => {
  await redisClient.connect();
  app.listen(port, () => {
    logger.info(`Collector server running on port ${port}`)
  })
})();

