import { Request, Response } from 'express'

export const compute = async (req: Request, res: Response): Promise<void> => {
    res.json({status: "ok"});
}