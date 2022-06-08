import { NextFunction, Response } from "express";

import { IRating } from "../interfaces/IRating";
import { ITuristSpot } from "../interfaces/ITuristSpot";

import { ratingService } from "../services/RatingService";
import { turistSpotService } from "../services/TuristSpotService";


type Request = {
    headers: {
        authorization?: string
    }
    query: {
        idRating?: number
    }
}

export const DeleteAdminRatingController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRating = req.query.idRating as number;
        //get rating to calculate turistspot average
        const refRating = await ratingService.findByPk(idRating) as IRating;
        //get turistspot to calculate turistspot average
        const refTuristspot = await turistSpotService.findByPk(refRating.idTuristSpot) as ITuristSpot;
        //get turistspot to calculate turistspot average
        const newSumAverage = refTuristspot.average - refRating.rating;
        const newQtdRatings = refTuristspot.qtdRatings - 1;
        const newAverage = newSumAverage / newQtdRatings;
        //update turistspot
        await refTuristspot.update({
            qtdRatings: newQtdRatings,
            average: newAverage
        });
        //delete rating by id
        await ratingService.destroy({ where: { id: idRating }});
        //send success mensage
        res.status(200)
        .json({ code: 'success-to-delete-rating' })
        .end();
        return;
    } catch(error) {
        console.log(error);
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
