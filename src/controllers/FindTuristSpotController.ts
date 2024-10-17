import { Response } from "express";
import { Op } from "sequelize";
import { ITuristSpot } from "../interfaces/ITuristSpot";

import { turistSpotService } from "../services/TuristSpotService";


type Request = {
    query: {
        postalCode?: string,
        state?: string,
        city?: string,
        street?: string,
    }
}

export const FindTuristSpotController = async (req: Request, res: Response) => {
    try {
        const {
            postalCode,
            state,
            city,
            street
        } = req.query;
        let turistspotFinded: Array<ITuristSpot> = [];
        //find by postalcode
        if (postalCode) {
            const listByPostalCode = await turistSpotService.findAll({
                where: { postalCode }
            });
            turistspotFinded = turistspotFinded.concat(listByPostalCode);
        }
        //find its like by state
        if (state) {
            const listByState = await turistSpotService.findAll({
                where: {
                    state: { [Op.iLike]: state }
                }
            });
            turistspotFinded = turistspotFinded.concat(listByState);
        }
        //find its like by city
        if (city) {
            const listByCity = await turistSpotService.findAll({
                where: {
                    city: {
                        [Op.iLike]: city,
                    }
                }
            });
            turistspotFinded = turistspotFinded.concat(listByCity);
        }
        //find its like by Street
        if (street) {
            const listByStreet = await turistSpotService.findAll({
                where: {
                    street: {
                        [Op.iLike]: street,
                    }
                }
            });
            turistspotFinded = turistspotFinded.concat(listByStreet);
        }
        let turistspotList = new Array<ITuristSpot>();
        //remove repeat turistspots
        turistspotFinded.map((turistSpotFound) => {
            const indexNotFound = - turistspotList.findIndex(
                (turistspot) => turistspot.id  === turistSpotFound.id 
            );
            if (indexNotFound) {
                turistspotList.push(turistSpotFound)
            }
        });
        //send turist spot list
        res.status(200)
            .json({
                code: 'success-to-find-turistspot',
                turistspotList
            })
            .end();
        return;
    } catch(error) {
        res.status(500)
            .json({ code: 'unknow-error' })
            .end();
        return;
    }
}
