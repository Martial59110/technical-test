import logger from '../shared/logger';
import redisClient from '../shared/redis';
import { Task } from '../shared/types';

export async function startSubscriber() {
  logger.info('Processor subscriber started ');
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    logger.error({ err }, 'Failed to connect to Redis in processor');
    throw err;
  } 
}

async function getPendingTasks(): Promise<Task[]> {
  const keys = await redisClient.keys('*');
  const pendingTasks: Task[] = [];
  
  for (const key of keys) {
    const taskData = await redisClient.get(key);
    if (taskData) {
      const task: Task = JSON.parse(taskData);
      if (task.status === 'pending') {
        pendingTasks.push(task);
      }
    }
  }
  
  return pendingTasks;
}