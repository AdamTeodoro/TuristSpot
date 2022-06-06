import { Response } from "express";

import fs from "fs";
import path from "path";
import { promisify } from "util";

import { turistSpotPictureService } from "../services/TuristSpotPictureService";

type Request = {
    headers: {
        authorization?: string,
    },
    query: {
        idPicture?: number,
    }
    idUser?: number
};

export async function DeleteTuristSpotPicturesController(req: Request, res: Response) {
    try {
        const idPicture = req.query.idPicture as number;
        //verfify if picture exists
        const refPicture = await turistSpotPictureService
        .findByPk(idPicture);
        if (!refPicture) {
            res.status(400)
            .json({ code: 'invalid-request-data' })
            .end();
            return;
        }
        const filename: string = refPicture.filename as string;
        //get flie path
        const filePath = path.resolve(
            __dirname,
            "..",
            "..",
            "images", 
            "turistspotpictures",
            filename
        );
        //parse to promise the unlink method
        const unlink = promisify(fs.unlink);
        //delete picture file by path and if success delete in database
        await unlink(filePath);
        //delete database object
        await refPicture.destroy();
        //res the success mensage
        res.status(200)
        .json({ code: 'success-to-delete-turistspot-picture' })
        .end();
        return;
    } catch(error) {
        console.log(error);
        res.status(500)
        .json({ code: 'internal-server-error' })
        .end();
        return;
    }
}
