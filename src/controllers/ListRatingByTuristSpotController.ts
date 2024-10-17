import { NextFunction, Response } from "express";

import { ratingService } from "../services/RatingService";
import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    query: {
        idTuristSpot?: number,
        lastRating?: number
    }
};

export const ListRatingByTuristSpotController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idTuristSpot = req.query.idTuristSpot as number;
        const lastRating = req.query.lastRating;
        const isFirstQuery = lastRating? false: true;
        //get turistspot if active
        const refTuristSpot = await turistSpotService.findOne({
            where: {
                id: idTuristSpot,
                isActive: true
            }
        });
        //verify if turist spot exists
        if (!refTuristSpot) {
            res.status(401)
                .json({ code: 'invalid-turistspot' })
                .end();
            return;
        }
        let ratingList = [ ];
        //if have last rating get the firsts else do the pagination from the last
        if (isFirstQuery) {
            //list first 25 rating by turistspot
            ratingList = await ratingService.findAll({
                where: {
                    idTuristSpot
                },
                limit: 25,
                order: [[ 'createdAt', 'desc' ]],
            });
        } else {
            //start by last turistspot and list 25 ratings by turistspot
            ratingList = await ratingService.findAll({
                where : {
                    idTuristSpot,
                },
                limit: 25,
                offset: lastRating,
                order: [[ 'updatedAt', 'desc' ]],
            });
        }
        // res send to listTuristSpots
        res.status(200)
            .json({
                code: 'success-to-list-ratings',
                ratingList
            })
            .end();
        return;
    } catch(error) {
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}
