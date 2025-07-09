import redisClient from '../../shared/redis';
import { Task } from '../../shared/types';

export async function enqueueTask(task: Task): Promise<void> {
    await redisClient.set(task.id, JSON.stringify(task));
}
