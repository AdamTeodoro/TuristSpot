
import { Response } from "express";

import { turistSpotPictureService } from "../services/TuristSpotPictureService";

type Request = {
    authorization?: string,
    query: {
        idTuristSpot?: number,
    }
    idUser?: number,
    file?: any,
    idPicture?: number,
};

export async function CreateTuristSpotPicturesController(req: Request, res: Response) {
    try {
        const { originalname, filename } = req.file;
        const idPicture = req.idPicture as number;
        //update add filds originalname and filename from store the file type
        const refTuristSpotPicture = await turistSpotPictureService.findByPk(idPicture);
        if (refTuristSpotPicture) {
            const turistSpotPictureUpdated = await refTuristSpotPicture.update({
                originalname,
                filename
            });
            //send turist spot
            res.status(200)
                .json({
                    code: 'success-to-create-turistspot-picture',
                    turistSpotPictureUpdated
                })
                .end();
            return;
        } else {
            res.status(400)
                .json({ code: 'invalid-request-turistspostpicture' })
                .end();
            return;
        }
    } catch {
        res.status(200)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}
