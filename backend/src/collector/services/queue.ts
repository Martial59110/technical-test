import redisClient from '../../shared/redis';
import { Task } from '../../shared/types';
import logger from '../../shared/logger';

export async function enqueueTask(task: Task): Promise<void> {
    try {
        await redisClient.set(task.id, JSON.stringify(task));
    } catch (error) {
        logger.error({ 
            message: 'Failed to store task in Redis',
            taskId: task.id,
            error: error instanceof Error ? error.message : String(error)
        });
        throw error; 
    }
}
