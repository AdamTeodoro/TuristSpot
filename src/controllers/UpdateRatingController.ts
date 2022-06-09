import { Response } from "express";
import { ITuristSpot } from "../interfaces/ITuristSpot";

import { ratingService } from "../services/RatingService";
import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    query: {
        idTuristSpot: number
    },
    body: {
        rating: {
            commentary: string,
            rating: number,
        }
    },
    idUser?: number,
}

export async function UpdateRatingController(req: Request, res: Response) {
    try {
        const { rating } = req.body;
        const idUser: number = req.idUser as number;
        const idTuristSpot = Number(req.query.idTuristSpot);
        //get rating user
        const refRating = await ratingService.findOne({
            where: {
                idTuristSpot: idTuristSpot,
                idSimpleUser: idUser,
            }
        });
        //verify if rating exits
        if (!refRating) {
            res.status(400)
            .json({ code: 'rating-not-exists' })
            .end();
            return;
        }
        //get turistspot
        const refTuristSpot = await turistSpotService.findByPk(idTuristSpot) as ITuristSpot;
        //calculate new rating from turistspot
        const sumAverage = (refTuristSpot.qtdRatings * refTuristSpot.average) - refTuristSpot.average;
        const newSumAverage = sumAverage + rating.rating;
        // update turist spot average
        await refTuristSpot.update({
            average: (newSumAverage / refTuristSpot.qtdRatings)
        });
        //update rating
        await refRating.update({
            rating: rating.rating,
            commentary: rating.commentary,
        });
        //send rating created
        res.status(200)
        .json({ code: 'success-to-update-rating' })
        .end();
        return;
    } catch(error) {
        console.log('erro ao criar rating: ', error);
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
