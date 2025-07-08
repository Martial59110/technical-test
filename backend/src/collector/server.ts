import express from 'express'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import logger from '../shared/logger'


dotenv.config()

const app = express()
const port = process.env.COLLECTOR_PORT

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  logger.info(`Collector server running on port ${port}`)
})
