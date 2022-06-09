import path from "path";
import { promisify } from "util";
import fs from "fs";

class ImgService {
    private _imgPath: string = path.resolve(
        __dirname,
        "..",
        "..",
        "images"
    );

    constructor() { }

    deleteImg(filename: string, tableName: string) {
        tableName = tableName.toLocaleLowerCase();
        //get flie path
        const filePath = this._imgPath + `/${tableName}/${filename}`;
        const unlink = promisify(fs.unlink);
        //delete picture file by path and if success delete in database
        return unlink(filePath);
    }

}

export const imgService = new ImgService();
