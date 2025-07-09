import logger from '../shared/logger';
import redisClient from '../shared/redis';

export async function startSubscriber() {
  logger.info('Processor subscriber started ');
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    throw err;
  } 
}