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
};

export async function CreateRatingController(req: Request, res: Response) {
    try {
        const { rating } = req.body;
        const idUser: number = req.idUser as number;
        const idTuristSpot = Number(req.query.idTuristSpot);
        //verify if turistspot id is valid
        const refturistSpot = await turistSpotService.findOne({
            where: {
                id: idTuristSpot,
                isActive: true
            }
        });
        //verify if turistspot is valid
        if (!refturistSpot) {
            res.status(401)
                .json({ code: 'invalid-turistspot' })
                .end();
            return;
        }
        // get rating user
        const ratingUserExists = await ratingService.findOne({
            where: {
                idTuristSpot: idTuristSpot,
                idSimpleUser: idUser,
            }
        });
        // verify user already create rating
        if (ratingUserExists) {
            res.status(400)
                .json({ code: 'rating-already-exists' })
                .end();
            return;
        }
        let newAverage;
        let newQtdRating;
        //calculate new rating from turistspot
        if (refturistSpot.average === -1) {
            newAverage = rating.rating;
            newQtdRating = 1;
        } else {
            const sumAverage = (refturistSpot.qtdRatings * refturistSpot.average);
            newQtdRating = refturistSpot.qtdRatings + 1;
            newAverage = (sumAverage + rating.rating) / newQtdRating;
        }
        // update turist spot
        await refturistSpot.update({
            qtdRatings: newQtdRating,
            average: newAverage
        });
        //create rating
        const createdRating = await ratingService.create({
            idTuristSpot: idTuristSpot,
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
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}