import { Response } from "express";

import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    headers: {
        authorization?: string,
    },
    query: {
        idTuristSpot?: number
    }
    idUser?: number
}

export async function InactiveTuristSpotController(req: Request, res: Response) {
    try {
        const idTuristSpot = Number(req.query.idTuristSpot);
        //inactive turist spot
        const refTuristSpot = await turistSpotService.findByPk(idTuristSpot);
        if (refTuristSpot) {
            const turistSpotInactived = await refTuristSpot.update({
                isActive: false
            });
            //send turist spot inactived
            res.status(200)
            .json({
                code: 'success-to-inactive-turistspot',
                turistSpotInactived
            })
            .end();
            return
        } else {
            res.status(400)
            .json({ code: 'invalid-request-turistspot' })
            .end();
            return
        }
    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
