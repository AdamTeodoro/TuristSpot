
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
}

export async function CreateTuristSpotPicturesController(req: Request, res: Response) {
    try {
        const { originalname, filename } = req.file;
        const idUser: number = req.idUser as number;
        const idPicture = req.idPicture as number;
        //update add filds originalname and filename from store the file type
        const refTuristSpotPicture = await turistSpotPictureService.update(
            idPicture,
            {
                originalname,
                filename
            }
        );
        //send turist spot
        res.status(200)
        .json({
            code: 'success-to-create-turistspot-picture',
            turistSpotPicture: {
                id: idPicture,
                idTuristSpot: req.query.idTuristSpot,
                idUser,
                originalname,
                filename,
                imgUrl: refTuristSpotPicture.imgUrl,
            }
        })
        .end();
        return;
    } catch {
        res.status(200)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
