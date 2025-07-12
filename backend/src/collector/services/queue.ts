import redisClient from '../../shared/redis';
import { Task } from '../../shared/types';
import logger from '../../shared/logger';

/**
 * Fonctions utilitaires pour gérer la file d'attente des tâches dans Redis.
 * - enqueueTask : ajoute une tâche dans Redis et la publie sur le canal 'task' pour le processeur.
 * - getAllTasks : récupère toutes les tâches stockées dans Redis (pour l'historique).
 * 
 * Ces fonctions sont utilisées par les routes du collecteur pour stocker et récupérer les calculs à traiter.
 * Toute la logique d'accès à Redis est centralisée ici.
 */

export async function enqueueTask(task: Task): Promise<void> {
    try {
        await redisClient.set(task.id, JSON.stringify(task));
 
        await redisClient.publish('task', JSON.stringify(task));
        
        logger.info({ taskId: task.id }, 'Task stored and published');
    } catch (error) {
        logger.error({ 
            message: 'Failed to store task in Redis',
            taskId: task.id,
            error: error instanceof Error ? error.message : String(error)
        });
        throw error; 
    }
}

export async function getAllTasks(): Promise<Task[]> {
    try {
        const keys = await redisClient.keys('*');
        const tasks: Task[] = [];
        
        for (const key of keys) {
            const taskData = await redisClient.get(key);
            if (taskData) {
                tasks.push(JSON.parse(taskData));
            }
        }
        
        return tasks;
    } catch (error) {
        logger.error({ 
            message: 'Failed to retrieve tasks from Redis',
            error: error instanceof Error ? error.message : String(error)
        });
        throw error;
    }
}
