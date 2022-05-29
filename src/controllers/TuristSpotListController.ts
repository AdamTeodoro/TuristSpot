import { NextFunction, Response } from "express";
import { Op } from "sequelize";

import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    query: {
        lastTuristSpot?: Date
    }
}

export const TuristSpotListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lastTuristSpot = req.query.lastTuristSpot;
        let turistSpotList = [];
        //if have turistspot get the firsts turistspot else do the pagination from the last
        if (lastTuristSpot) {
            //start by last turistspot and list 25 turistspots if is active
            turistSpotList = await turistSpotService.findAll({
                where: {
                    isActive: true,
                    start: {
                        [Op.between]: [lastTuristSpot, Date.now()],
                    },
                },
                limit: 25,
                order: [['lastTuristSpot', 'desc']],
            });
        } else {
            //list first 25 turistspots if is active
            turistSpotList = await turistSpotService.findAll({
                where: {
                    isActive: true
                },
                limit: 25,
                order: [['lastTuristSpot', 'desc']],
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
