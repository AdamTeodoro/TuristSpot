
import { Response } from "express";

import multer from "multer";

import { TuristSpotData, turistSpotService } from "../services/TuristSpotService";

type Request = {
    authorization?: string,
    query: {
        idPicture?: number,
        idItem?: number,
    }
    idUser?: number,
    file?: any;
}

export async function CreateTuristSpotPicturesController(req: Request, res: Response) {
    try {
        const { originalname, filename } = req.file;
        const idUser: number = req.idUser as number;
        
        //send turist spot
        res.status(200)
        .json({
            code: 'success-to-create-turist-spot',
            
        })
        .end();
        return;
    } catch {
        
    }
}