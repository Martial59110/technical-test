import logger from '../shared/logger';
import redisClient from '../shared/redis';
import { Task } from '../shared/types';
import { performCalculation } from './services/calculator';

export async function startSubscriber() {
  logger.info('Processor subscriber started ');
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
    
    await subscriber.subscribe('task', async (message) => {
      try {
        const task: Task = JSON.parse(message);
        await processTask(task);
      } catch (error) {
        logger.error({ error, message }, 'Failed to process task from channel');
      }
    });
    
    logger.info('Subscribed to task channel');
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

async function processTask(task: Task): Promise<void> {
  try {
    const result = performCalculation(task.compute.operation, task.compute.operands);
    
    task.result = result;
    task.status = 'success';
    
    await redisClient.set(task.id, JSON.stringify(task));
    logger.info({ taskId: task.id, result }, 'Task processed successfully');
  } catch (error) {
    task.result = error instanceof Error ? error.message : String(error);
    task.status = 'failed';
    
    await redisClient.set(task.id, JSON.stringify(task));
    logger.error({ taskId: task.id, error }, 'Task processing failed');
  }
}