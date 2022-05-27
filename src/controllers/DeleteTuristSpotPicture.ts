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
        filename?: string,
    }
    idUser?: number
}

export async function DeleteTuristSpotPictureController(req: Request, res: Response) {
    try {
        const idPicture = req.query.idPicture as number;
        const filename = req.query.filename as string
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
        await unlink(filePath)
        .then(async () => { 
            await turistSpotPictureService.destroy({
                where: {
                    id: idPicture
                }
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500)
            .json({ code: 'unknow-error' })
            .end();
            return;
        });
        //res the success mensage
        res.status(200)
        .json({
            code: 'success-to-delete-turistspot-picture',
        })
        .end();
        return

    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
