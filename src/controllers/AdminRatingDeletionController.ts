import { NextFunction, Response } from "express";

import { ratingService } from "../services/RatingService";

type Request = {
    headers: {
        authorization?: string
    }
    query: {
        idRating?: number
    }
}

export const AdminRatingDeletionController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idRating = req.query.idRating as number
        //delete rating by id
        await ratingService.deleteById(idRating);
        //send success mensage
        res.status(200)
        .json({ code: 'success-to-delete-rating' })
        .end();
        return;
    } catch(error) {
        console.log(error);
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
