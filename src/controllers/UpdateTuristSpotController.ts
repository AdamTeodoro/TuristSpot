import { Response } from "express";

import { TuristSpotData, turistSpotService } from "../services/TuristSpotService";

type Request = {
    query: {
        idTuristSpot: number,
    },
    body: {
        turistSpot: Partial<TuristSpotData>
    },
    idUser?: number,
};

export async function UpdateTuristSpotController(req: Request, res: Response) {
    try {
        const idUser: number = req.idUser as number;
        const { turistSpot } = req.body;
        const idTuristSpot = req.query.idTuristSpot;
        //create turist spot
        const refTuristSpot = await turistSpotService.findByPk(idTuristSpot);
        if (refTuristSpot) {
            const turistSpotUpdated = await refTuristSpot.update({
                idAdmin: idUser,
                isActive: turistSpot.isActive,
                city: turistSpot.city,
                history: turistSpot.history,
                postalCode: turistSpot.postalCode,
                state: turistSpot.state,
                street: turistSpot.street,
                totalVisitsReceived: turistSpot.totalVisitsReceived
            });
            //send turist spot
            res.status(200)
                .json({
                    code: 'success-to-update-turist-spot',
                    turistSpotUpdated
                })
                .end();
            return;
        } else {
            res.status(400)
                .json({ code: 'invalid-request-turistspot' })
                .end();
            return;
        }
    } catch(error) {
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}
