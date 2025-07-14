import dotenv from 'dotenv'
import cors from 'cors';
import express from 'express'
import { Request, Response } from 'express'
import logger from '../shared/logger'
import { compute, getTasks } from './routes/compute'
import { clearTasks } from './routes/compute'
import redisClient from '../shared/redis';

/**
 * Point d'entrée du serveur collecteur (Express).
 * - Initialise Express, configure CORS pour n'accepter que le front.
 * - Connecte le client Redis avant de démarrer le serveur.
 * - Expose les routes principales : /compute, /tasks (GET et DELETE).
 * 
 * Ce fichier lance le serveur HTTP qui reçoit les requêtes du front et interagit avec Redis pour la gestion des calculs.
 */

dotenv.config({ path: '../../.env' })

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
