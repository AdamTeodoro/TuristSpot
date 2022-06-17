import { NextFunction, Response } from "express";

import { ratingPictureService } from "../services/RatingPictureService";
import { ratingService } from "../services/RatingService";


type Request = {
    query: {
        idRating: number
    }
};

export const ListRatingPictureController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRating = req.query.idRating;
        // verify if rating exists
        const refRating = await ratingService.findByPk(idRating);
        if (!refRating) {
            res.status(400)
            .json({ code: 'invalid-request-turistspot' })
            .end();
            return;
        }
        //// get pictures list
        const refTuristSpotPicture = await ratingPictureService.findAll({
            where: {
                idRating
            }
        });
        //send pictures list
        res.status(200)
        .json({
            code: 'success-to-list-pictures',
            turistSpotPictureList: refTuristSpotPicture
        })
        .end();
        return
    } catch {
        res.status(500)
        .json({ code: 'invalid-request-data' })
        .end();
        return;
    }
}
