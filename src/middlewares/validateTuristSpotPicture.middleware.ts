import { NextFunction, Response } from "express";

import { turistSpotPictureService } from "../services/TuristSpotPictureService";

type Request = {
    query: {
        idItem?: number
    }
    idUser?: number,
    imgTable?: string,
    idPicture?: number,
}

export const validateTuristSpotMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idUser = req.idUser as number;
        const idItem = Number(req.query.idItem);
        req.imgTable = "TURISTSPOTPICTURES";
        const turistSpotPicture = await turistSpotPictureService.create({
            idAdmin: idUser,
            idTuristSpot: idItem,
        });
        req.idPicture = turistSpotPicture.id;
        next()
        return;
    } catch(error) {
        console.log(error);
        res.status(500)
        .json({ code: 'internal-server-error' })
        .end();
        return;
    }
}
