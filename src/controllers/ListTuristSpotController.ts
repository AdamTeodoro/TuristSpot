import { NextFunction, Response } from "express";

import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    query: {
        lastTuristSpot?: number
    }
};

export const ListTuristSpotController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastTuristSpot = req.query.lastTuristSpot;
        const isFirstQuery = lastTuristSpot? false: true;
        let turistSpotList = [];
        //if first query list 25 objects else paginate this query
        if (isFirstQuery) {
            //list first 25 turistspots if is active
            turistSpotList = await turistSpotService.findAll({
                where: {
                    isActive: true
                },
                limit: 25,
                order: [['updatedAt', 'desc']],
            });
        } else {
            //start by last turistspot and list 25 turistspots if is active
            turistSpotList = await turistSpotService.findAll({
                where: {
                    isActive: true,
                },
                offset: lastTuristSpot,
                limit: 25,
                order: [['updatedAt', 'desc']],
            });
        }
        // res send to listTuristSpots
        res.status(200)
        .json({
            code: 'success-to-list-turistspots',
            turistSpotList
        })
        .end();
        return;
    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
