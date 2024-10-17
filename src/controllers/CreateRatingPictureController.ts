import { Response } from "express";

import { ratingPictureService } from "../services/RatingPictureService";

type Request = {
    headers: {
        authorization?: string
    },
    query: {
        idRating?: string
    },
    idUser?: number,
    imgTable?: number,
    file?: any,
    idPicture?: number,
};

export const CreateRatingPictureController = async (req: Request, res: Response) => {
    try {
        //get rating
        const { originalname, filename } = req.file;
        //find rating picture
        const refRatingPicture = await ratingPictureService
        .findByPk(req.idPicture);
        if (!refRatingPicture) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        }
        //update rating picture
        const ratingPictureUpdated = await refRatingPicture.update({
            originalname,
            filename,
        });
        //send turist spot
        res.status(200)
            .json({
                code: 'success-to-create-turistspot-picture',
                ratingPictureUpdated
            })
            .end();
        return;
    } catch { 
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;        
    }
}
