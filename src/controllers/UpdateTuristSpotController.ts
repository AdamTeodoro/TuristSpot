import { Response } from "express";

import { TuristSpotData, turistSpotService } from "../services/TuristSpotService";

import multer from "multer";

type Request = {
    query: {
        idTuristSpot: number,
    }
    body: {
        turistSpot: TuristSpotData
    },
    idUser?: number,
};

export async function UpdateTuristSpotController(req: Request, res: Response) {
    try {
        const idUser: number = req.idUser as number;
        const { turistSpot } = req.body;
        //create turist spot
        const turistSpotUpdated = await turistSpotService.update(req.query.idTuristSpot, {
            idAdmin: idUser,
            isActive: true,
            average: turistSpot.average,
            city: turistSpot.city,
            history: turistSpot.city,
            postalCode: turistSpot.postalCode,
            state: turistSpot.state,
            street: turistSpot.street,
            totalVisitsReceived: turistSpot.totalVisitsReceived
        });
        //send turist spot
        res.status(200)
        .json({
            code: 'success-to-create-turist-spot',
            turistSpotUpdated
        })
        .end();
        return;
    } catch(error) {
        console.log(error)
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
