import logger from '../shared/logger';
import redisClient from '../shared/redis';
import { Task } from '../shared/types';
import { performCalculation } from './services/calculator';

/**
 * Ce fichier gère la logique du processeur qui écoute les tâches à traiter via Redis.
 * - Se connecte à Redis et s'abonne au canal 'task' pour recevoir les nouveaux calculs à traiter.
 * - Au démarrage, traite aussi toutes les tâches en attente (status 'pending').
 * - Pour chaque tâche reçue, effectue le calcul et met à jour le résultat et le statut dans Redis.
 * 
 * Toute la logique de traitement asynchrone et de gestion des erreurs est centralisée ici.
 */

export async function startSubscriber() {
  logger.info('Processor subscriber started ');
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    
    // Récupérer et traiter les tâches en attente au démarrage
    const pendingTasks = await getPendingTasks();
    for (const task of pendingTasks) {
      await processTask(task);
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