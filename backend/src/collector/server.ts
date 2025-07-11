import dotenv from 'dotenv'
import cors from 'cors';



dotenv.config()

import express from 'express'
import { Request, Response } from 'express'
import logger from '../shared/logger'
import { compute, getTasks } from './routes/compute'

const app = express()
const port = process.env.COLLECTOR_PORT

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:4173'
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


app.post('/compute', compute)
app.get('/tasks', getTasks)

app.listen(port, () => {
  logger.info(`Collector server running on port ${port}`)
})
