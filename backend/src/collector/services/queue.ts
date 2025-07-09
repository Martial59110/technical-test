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
