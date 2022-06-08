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
        const idTuristSpot = Number(req.query.idTuristSpot);

        //verify if turistspot id is valid
        const refturistSpot = await turistSpotService.findByPk(idTuristSpot)
        if (!refturistSpot) {
            res.status(400)
            .json({ code: 'invalid-turistspot-id' })
            .end();
            return;
        }
        //get rating user
        const ratingUserExists = await turistSpotService.findOne({
            where: {
                idTuristSpot: idTuristSpot,
                idSimpleUser: idUser,
            }
        });
        if (ratingUserExists) {
            res.status(400)
            .json({ code: 'classification-already-exists' })
            .end();
            return;
        }
        let newSumAverage;
        let newQtdRating;
        //calculate new rating from turistspot
        if (refturistSpot.average === -1) {
            newSumAverage = rating.rating;
        } else {
            const sumAverage = (refturistSpot.qtdRatings * refturistSpot.average);
            newSumAverage = sumAverage + rating.rating;
        }
        newQtdRating = refturistSpot.qtdRatings + 1;
        // update turist spot
        refturistSpot.update({
            qtdRatings: newQtdRating,
            average: (newSumAverage / newQtdRating)
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
        console.log('erro ao criar rating: ', error);
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}