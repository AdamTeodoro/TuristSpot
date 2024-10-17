import { NextFunction, Response } from "express";

import { turistSpotPictureService } from '../services/TuristSpotPictureService';
import { turistSpotService } from "../services/TuristSpotService";

type Request = {
    query: {
        idTuristSpot: number
    }
};

export const ListTuristSpotPictureController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idTuristSpot = req.query.idTuristSpot;
        //verify if turist spot exists
        const refTuristSpot = await turistSpotService.findByPk(idTuristSpot);
        if (!refTuristSpot) {
            res.status(400)
                .json({ code: 'invalid-request-turistspot' })
                .end();
            return;
        }
        //get turistspot images
        const refTuristSpotPicture = await turistSpotPictureService.findAll({
            where: {
                idTuristSpot
            }
        });
        //response with pictures list
        res.status(200)
            .json({
                code: 'success-to-list-pictures',
                turistSpotPictureList: refTuristSpotPicture
            })
            .end();
        return;
    } catch {
        res.status(500)
            .json({ code: 'invalid-request-data' })
            .end();
        return;
    }
}
