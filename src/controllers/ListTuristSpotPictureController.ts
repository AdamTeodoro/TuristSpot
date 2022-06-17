import { NextFunction, Response } from "express";

import { turistSpotPictureService } from '../services/TuristSpotPictureService';

type Request = {
    query: {
        idTuristSpot: number
    }
};

export const ListTuristSpotPictureController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idTuristSpot = req.query.idTuristSpot;
        const refTuristSpotPicture = await turistSpotPictureService.findAll({
            where: {
                idTuristSpot
            }
        });
        if (refTuristSpotPicture) {
            res.status(200)
            .json({
                code: 'success-to-list-pictures',
                turistSpotPictureList: refTuristSpotPicture
            })
            .end();
            return
        } else {
            res.status(400)
            .json({ code: 'invalid-request-turistspot' })
            .end();
            return;
        }
    } catch {
        res.status(500)
        .json({ code: 'invalid-request-data' })
        .end();
        return;
    }
}
