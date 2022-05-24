import { NextFunction, Response } from "express";

import { turistSpotPictureService } from "../services/TuristSpotPictureService";

type Request = {
    query: {
        idTuristSpot?: number
    }
    idUser?: number,
    imgTable?: string,
    idPicture?: number,
    idItem?: number,
}

export const validateTuristSpotPictureMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const { originalname, filename } = req.file
        const idUser = req.idUser as number;
        req.imgTable = "turistspotpictures";
        //create picture from turistspot owner of idTuristSpot
        const turistSpotPicture = await turistSpotPictureService.create({
            idAdmin: idUser,
            idTuristSpot: Number(req.query.idTuristSpot),
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
