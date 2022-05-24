import { Response } from "express";
import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    header: {
        authorization: number,
    },
    query: {
        idTuristSpot: number
    }
    idUser?: number
}

export async function CreateTuristSpotPicturesController(req: Request, res: Response) {
    try {
        const idTuristSpot = req.query.idTuristSpot
        const turistSpotInactived = await turistSpotService.update(
            idTuristSpot,
            {
                isActive: false
            }
        );
        res.status(200)
        .json({
            code: 'success-to-inactive-turistspot',
            turistSpotInactived
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
