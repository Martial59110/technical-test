import { Request, Response } from 'express'
import { validateCompute } from '../../utils/validation'
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../shared/types';
import { enqueueTask } from '../services/queue';
import logger from '../../shared/logger';

export const compute = async (req: Request, res: Response): Promise<void> => {
    if (!validateCompute(req.body)) {
        logger.warn({ 
            message: 'Invalid compute payload received',
            body: req.body,
            ip: req.ip
        });
        res.status(400).json({ status: "error", message: "Invalid compute payload. 'operation' doit être une string parmi [add, substract, multiply, divide] et 'operands' doit être un tableau de deux nombres." });
        return;
    }

    const id = uuidv4();
    const task: Task = {
        id,
        compute: req.body,
        result: "",
        status: "pending"
    };

    try {
        await enqueueTask(task); 
        res.json({status: "ok"});
    } catch (error) {
        logger.error({ 
            message: 'Failed to enqueue task',
            taskId: id,
            error: error instanceof Error ? error.message : String(error)
        });
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}