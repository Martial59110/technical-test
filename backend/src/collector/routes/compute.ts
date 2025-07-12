import { Request, Response } from 'express'
import { validateCompute } from '../../utils/validation'
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../shared/types';
import { enqueueTask, getAllTasks } from '../services/queue';
import redisClient from '../../shared/redis';
import logger from '../../shared/logger';

export const compute = async (req: Request, res: Response): Promise<void> => {
    if (!validateCompute(req.body)) {
        logger.warn({ 
            message: 'Invalid compute payload received',
            body: req.body,
            ip: req.ip
        });
        res.status(400).json({ status: "error", message: "Invalid compute payload. 'operation' doit être une string parmi [addition, subtract, multiply, divide] et 'operands' doit être un tableau de deux nombres." });
        return;
    }

    const id = uuidv4();
    const task: Task = {
        id,
        compute: req.body,
        result: "",
        status: "pending",
        createdAt: new Date().toISOString()
    };

    try {
        await enqueueTask(task); 
        res.json({status: "ok", id});
    } catch (error) {
        logger.error({ 
            message: 'Failed to enqueue task',
            taskId: id,
            error: error instanceof Error ? error.message : String(error)
        });
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await getAllTasks();
        res.json({ status: "ok", tasks });
    } catch (error) {
        logger.error({ 
            message: 'Failed to retrieve tasks',
            error: error instanceof Error ? error.message : String(error)
        });
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

export const clearTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        await redisClient.flushAll();
        res.json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Failed to clear tasks" });
    }
};