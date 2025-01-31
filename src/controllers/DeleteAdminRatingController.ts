import { NextFunction, Response } from "express";

import { IRating } from "../interfaces/IRating";
import { ITuristSpot } from "../interfaces/ITuristSpot";
import { imgService } from "../services/ImgService";
import { ratingPictureService } from "../services/RatingPictureService";

import { ratingService } from "../services/RatingService";
import { turistSpotService } from "../services/TuristSpotService";


type Request = {
    headers: {
        authorization?: string
    },
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
        const newSumAverage = (refTuristspot.average * refTuristspot.qtdRatings) - refRating.rating;
        const newQtdRatings = refTuristspot.qtdRatings - 1;
        const newAverage = newQtdRatings > 0? (newSumAverage / newQtdRatings): -1;
        //update turistspot
        await refTuristspot.update({
            qtdRatings: newQtdRatings,
            average: newAverage
        });
        //get pictures
        const arrayRatingPictures = await ratingPictureService.findAll({
            where: {
                idRating: refRating.id
            }            
        });
        //delete all images
        arrayRatingPictures.map(async (refRating) => {
            await imgService.deleteImg(
                refRating.filename,
                'RATINGPICTURES'
            );
        })
        //delete rating by id
        await ratingService.destroy({
            where: {
                id: idRating
            }
        });
        //send success mensage
        res.status(200)
            .json({ code: 'success-to-delete-rating' })
            .end();
        return;
    } catch(error) {
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}
