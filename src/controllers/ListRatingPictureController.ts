import { NextFunction, Response } from "express";

import { ratingPictureService } from "../services/RatingPictureService";


type Request = {
    query: {
        idRating: number
    }
};

export const ListRatingPictureController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRating = req.query.idRating;
        const refTuristSpotPicture = await ratingPictureService.findAll({
            where: {
                idRating
            }
        });
        //verify if turistspot picture exists
        if (refTuristSpotPicture) {
            res.status(200)
            .json({
                code: 'success-to-list-pictures',
                turistSpotPictureList: refTuristSpotPicture
            })
            .end();
            return
        } else {
            res.status(400)
            .json({ code: 'invalid-request-turistspot' })
            .end();
            return;
        }
    } catch {
        res.status(500)
        .json({ code: 'invalid-request-data' })
        .end();
        return;
    }
}
