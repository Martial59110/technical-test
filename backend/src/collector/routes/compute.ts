import { Request, Response } from 'express'
import { validateCompute } from '../../utils/validation'

export const compute = async (req: Request, res: Response): Promise<void> => {
    if (!validateCompute(req.body)) {
        res.status(400).json({ status: "error", message: "Invalid compute payload. 'operation' doit être une string parmi [add, substract, multiply, divide] et 'operands' doit être un tableau de deux nombres." });
        return;
    }
   
    res.json({status: "ok"});
}