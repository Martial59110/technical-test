import { createClient } from 'redis';
import logger from './logger';

/**
 * Ce fichier initialise et exporte un client Redis partagé pour tout le backend.
 * - Utilise l'URL de connexion passée en variable d'environnement (REDIS_URL).
 * - Sert de point d'accès unique à Redis pour tous les modules (collecteur, processeur, etc.).
 * 
 * Les événements de connexion et d'erreur sont loggués pour faciliter le debug.
 */

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

export default redisClient; 