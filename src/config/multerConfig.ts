import { Request } from 'express';

import multer from 'multer';

import { resolve, extname } from 'path';

export default {
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        //validate file type
        if (
            file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/jpg'
        ) {
            return cb(new multer.MulterError('LIMIT_FIELD_VALUE'))
        }
        //validate file size
        if (file.size > 5000000) {
            return cb(new multer.MulterError('LIMIT_FILE_SIZE'))
        }
        //call the next middleware
        return cb(null, true);
    },
    storage: multer.diskStorage({
        //return the call back with the path from folder of file
        destination: (req: any, file, cb) => {
            const fullPath = 'images/' + req.imgTable + "/";
            cb(null, resolve(__dirname, '..', '..', fullPath))
        },
        //return the call back with de filne name
        filename: (req: any, file, cb) => {
            cb(null, `${req.idPicture}_${extname(file.originalname)}`);
        }
    })
};
