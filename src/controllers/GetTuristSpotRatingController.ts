import { Response } from "express";
import { Op } from "sequelize/types";
import { ratingService } from "../services/RatingService";
import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    query: {
        idTuristSpot: number;
        lastRating?: Date;
    }
};

export const GetTuristSpotRatingController = async (req: Request, res: Response) => {
    try {
        const { idTuristSpot, lastRating } = req.query;
        let ratingList = [];
        //verify if last rating exists
        if (lastRating) {
            //if lastRating exists paginate data
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
            //if last rating not exists find first ratings
            ratingList = await ratingService.findAll({ 
                where: {
                    idTuristSpot 
                },
                limit: 25,
                order: [['createdAt', 'desc']],
            });
        }
        //send success mensage an rating list
        res.status(200)
        .json({ 
            code: 'success-to-list-ratings',
            ratingList
        })
    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
