import { NextFunction, Response } from "express";

type Request = {
    query: {
        lastTuristSpot: Date
    }
}

export const TuristSpotListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastTuristSpot = req.query.lastTuristSpot;
        
    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
