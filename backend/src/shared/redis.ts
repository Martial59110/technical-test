import { createClient } from 'redis';
import logger from './logger';

// Client Redis partagé entre collecteur et processeur
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

//Log des erreurs Redis
redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

// Log de connexion réussie
redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

export default redisClient; 