import { Response } from "express";
import path from "path";
import fs from "fs";
import { promisify } from "util";

import { ratingPictureService } from "../services/RatingPictureService";
import { ratingService } from "../services/RatingService";
import { IRating } from "../interfaces/IRating";


type Request = {
    headers: {
        authorization?: string,
    },
    query: {
        idPicture?: number
    }
};

export const DeleteRatingPictureController = async (req: Request, res: Response) => {
    try {
        const idPicture = req.query.idPicture;
        const refPicture = await ratingPictureService
        .findByPk(idPicture);
        if (!refPicture) {
            res.status(400)
            .json({ code: 'invalid-request-data' })
            .end();
            return;
        }
        const filename: string = refPicture.filename as string;
        //get flie path
        const filePath = path.resolve(
            __dirname,
            "..",
            "..",
            "images", 
            "ratingpictures",
            filename
        );
        const unlink = promisify(fs.unlink);
        //delete picture file by path and if success delete in database
        await unlink(filePath);
        //delete database object representation
        await refPicture.destroy();
        //decrease qtd rating
        const refRating = await ratingService.findByPk(refPicture.idRating) as IRating;
        await refRating.update({
            qtdImg: refRating.qtdImg--            
        });
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
