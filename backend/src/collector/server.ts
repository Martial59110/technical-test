import dotenv from 'dotenv'


dotenv.config()

import express from 'express'
import { Request, Response } from 'express'
import logger from '../shared/logger'

const app = express()
const port = process.env.COLLECTOR_PORT

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.info(`Collector server running on port ${port}`)
})
