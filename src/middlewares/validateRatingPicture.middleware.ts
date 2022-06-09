import { NextFunction, Response } from "express";

import { ratingPictureService } from "../services/RatingPictureService";
import { ratingService } from "../services/RatingService";

type Request = {
    headers: {
        authorization?: string
    },
    query: {
        idRating?: string
    },
    idUser?: number,
    imgTable?: string,
    qtdRatingPicture?: number,
    idPicture?: number
};

export const validateRatingPicture = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idRating = Number(req.query.idRating)
        const refRating = await ratingService.findByPk(idRating);
        //verify if rating exists
        if (!refRating) {
            res.status(400)
            .json({ code: 'invalid-request-rating' })
            .end();
            return;
        }
        //verify if valid user authenticated
        if (req.idUser !== refRating.idSimpleUser) {
            res.status(401)
            .json({ code: 'invalid-request-authorization' })
            .end();
            return;
        }
        //verify if qtdimagens is valid
        if (refRating.qtdImg >= 5) {
            res.status(400)
            .json({ code: 'invalid-qtd-image-rating'})
            .end();
            return;
        }
        //create rating picture
        const refRatingPicture = await ratingPictureService.create({
            idRating,
            idUser: req.idUser,
        });
        //increment qtd img of rating picture
        refRating.qtdImg++;
        await refRating.save();
        //get rating picture to use in image
        req.idPicture = refRatingPicture.id;
        next();
        return;
    } catch(error) {
        console.log(error);
        res.status(500)
        .json({ code: 'internal-server-error' })
        .end();
        return;
    }
}
