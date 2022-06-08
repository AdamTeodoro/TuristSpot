import { Response } from "express";

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
        const refRating = await turistSpotService.findOne({
            where: {
                idTuristSpot: idTuristSpot,
                idSimpleUser: idUser,
            }
        });
        if (!refRating) {
            res.status(400)
            .json({ code: 'classification-not-exists' })
            .end();
            return;
        }
        //create rating
        await refRating.update({
            rating: rating.rating,
            commentary: rating.commentary,
        });
        //send rating created
        res.status(200)
        .json({ code: 'success-to-create-rating' })
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
