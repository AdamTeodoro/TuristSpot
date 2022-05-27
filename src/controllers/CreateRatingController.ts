import { Response } from "express";

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

export async function CreateRatingController(req: Request, res: Response) {
    try {
        const { rating } = req.body;
        const idUser: number = req.idUser as number;
        const { idTuristSpot } = req.query;

        //verify if turistspot id is valid
        const refturistSpot = await turistSpotService.getById(idTuristSpot)
        if (!refturistSpot) {
            res.status(400)
            .json({ code: 'invalid-turistspot-id' })
            .end();
            return;
        }
        //calculate new rating from turistspot
        const sumAverage = (refturistSpot.qtdRatings * refturistSpot.average);
        const newSumaverage = sumAverage + rating.rating;
        const newQtdRating = refturistSpot.qtdRatings + 1;
        //set new data
        refturistSpot.set({
            qtdRatings: newQtdRating,
            average: newSumaverage / newQtdRating
        });
        // update turist spot
        await refturistSpot.save();
        //create rating
        const createdRating = await ratingService.create({
            idTuristSpot: req.query.idTuristSpot,
            idSimpleUser: idUser,
            rating: rating.rating,
            commentary: rating.commentary,
            qtdImg: 0,
        });
        //send rating created
        res.status(200)
        .json({
            code: 'success-to-create-rating',
            createdRating
        })
        .end();
        return;
    } catch(error) {
        console.log(error)
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}