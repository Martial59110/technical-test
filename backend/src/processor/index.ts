import dotenv from 'dotenv'
import express from 'express'
import { startSubscriber } from './subscriber';
import logger from '../shared/logger';

/**
 * Point d'entrée du processeur.
 * - Démarre le subscriber qui va écouter les tâches à traiter via Redis.
 * - Expose un serveur HTTP simple pour le monitoring.
 * - Gère les erreurs globales et loggue si le processeur crash.
 * 
 * Ce fichier lance le worker qui traite les calculs en arrière-plan.
 */

dotenv.config({ path: '../../.env' })

const app = express()
const port = process.env.PROCESSOR_PORT

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'processor' })
})

app.get('/status', (req, res) => {
  res.json({ 
    status: 'running', 
    service: 'processor',
    timestamp: new Date().toISOString()
  })
})

async function main() {
  // Démarrer le serveur HTTP
  app.listen(port, () => {
    logger.info(`Processor server running on port ${port}`)
  })
  
  // Démarrer le subscriber Redis
  await startSubscriber();
}

main().catch((err) => {
  logger.error('Processor crashed:', err);
});