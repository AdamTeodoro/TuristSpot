import { Response } from "express";

import { ratingPictureService } from "../services/RatingPictureService";
import { ratingService } from "../services/RatingService";
import { IRating } from "../interfaces/IRating";
import { imgService } from "../services/ImgService";


type Request = {
    headers: {
        authorization?: string,
    },
    query: {
        idPicture?: number
    },
    idUser?: number
};

export const DeleteRatingPictureController = async (req: Request, res: Response) => {
    try {
        const idPicture = req.query.idPicture;
        const refRatingPicture = await ratingPictureService.findByPk(idPicture);
        //verify if refPicture exits
        if (!refRatingPicture) {
            res.status(400)
                .json({ code: 'invalid-request-data' })
                .end();
            return;
        }
        //verify if is valid authorization
        if (refRatingPicture.idUser != req.idUser) {
            res.status(403)
                .json({ code: 'invalid-authorization' })
                .end();
            return;
        }
        //get file
        const filename: string = refRatingPicture.filename as string;
        //get flie path
        await imgService.deleteImg(
            filename,
            'RATINGPICTURES'
        );
        //delete database object representation
        await refRatingPicture.destroy();
        //decrease qtd rating
        const refRating = await ratingService.findByPk(refRatingPicture.idRating) as IRating;
        await refRating.update({ qtdImg: refRating.qtdImg-- });
        //res the success mensage
        res.status(200)
            .json({ code: 'success-to-delete-turistspot-picture' })
            .end();
        return;
    } catch {
        res.status(500)
            .json({ code: 'internal-server-error' })
            .end();
        return;
    }
}
