import { Response } from "express";

import { ratingService } from "../services/RatingService";

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
        const createdRating = await ratingService.create({
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