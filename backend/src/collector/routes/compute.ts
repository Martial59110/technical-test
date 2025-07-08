import { Request, Response } from 'express'

export const compute = async (req: Request, res: Response) => {
    return res.json({status: "ok"});
}