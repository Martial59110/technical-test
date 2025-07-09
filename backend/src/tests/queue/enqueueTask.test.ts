import { describe, expect, it } from 'vitest';
import { enqueueTask } from '../../collector/services/queue';
import redisClient from '../../shared/redis';
import { Task } from '../../shared/types';

describe('enqueueTask', () => {
  it('should store the task in Redis', async () => {
    const task: Task = {
      id: 'test-id',
      compute: { operation: 'add', operands: [1, 2] },
      result: '',
      status: 'pending'
    };
    await enqueueTask(task);
    const stored = await redisClient.get(task.id);
    expect(stored).toBe(JSON.stringify(task));

    await redisClient.del(task.id);
  });
});