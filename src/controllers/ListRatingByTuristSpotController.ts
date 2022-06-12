import { NextFunction, Response } from "express";

import { Op } from "sequelize";

import { ratingService } from "../services/RatingService";

type Request = {
    query: {
        idTuristSpot?: number,
        lastRating?: Date
    }
}


export const ListRatingByTuristSpotController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const lastRating = req.query.lastRating;
        const idTuristSpot = req.query.idTuristSpot as number;
        let ratingList = [];
        //if have last rating get the firsts else do the pagination from the last
        if (lastRating) {
            //start by last turistspot and list 25 ratings by turistspot
            ratingList = await ratingService.findAll({
                where: {
                    idTuristSpot,
                    start: {
                        [Op.between]: [lastRating, new Date(0)],
                    },
                },
                limit: 25,
                order: [['createdAt', 'desc']],
            });
        } else {
            //list first 25 rating by turistspot
            ratingList = await ratingService.findAll({
                where: {
                    idTuristSpot
                },
                limit: 25,
                order: [['createdAt', 'desc']],
            });
        }
        // res send to listTuristSpots
        res.status(200)
        .json({
            code: 'success-to-list-turistspots',
            ratingList
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

