import dotenv from 'dotenv'


dotenv.config()

import express from 'express'
import { Request, Response } from 'express'
import logger from '../shared/logger'
import { compute } from './routes/compute'

const app = express()
const port = process.env.COLLECTOR_PORT

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


app.post('/compute', compute)

app.listen(port, () => {
  logger.info(`Collector server running on port ${port}`)
})
