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
        const listByPostalCode = await turistSpotService.findAll({
            where: {
                postalCode
            }
        });
        turistspotFinded = turistspotFinded.concat(listByPostalCode);
        //find its like by state
        const listByState = await turistSpotService.findAll({
            having: { lower: state },
            where: {
                postalCode: {
                    [Op.like]: state,
                }
            }
        });
        turistspotFinded = turistspotFinded.concat(listByState);
        //find its like by city
        const listByCity = await turistSpotService.findAll({
            having: { lower: city },
            where: {
                city: {
                    [Op.like]: city,
                }
            }
        });
        turistspotFinded = turistspotFinded.concat(listByCity);
        //find its like by Street
        const listByStreet = await turistSpotService.findAll({
            having: { lower: street },
            where: {
                street: {
                    [Op.like]: street,
                }
            }
        });
        turistspotFinded = turistspotFinded.concat(listByStreet);
        let turistspotList = new Array<ITuristSpot>();
        //remove repeat turistspots
        turistspotFinded.map((turistSpotFound) => {
            const indexNotFound = - turistspotList.findIndex(
                (turistspot) => {
                    return turistspot.id  === turistSpotFound.id
                }
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
    } catch {
        res.status(500)
        .json({ code: 'unknow-error' })
        .end();
        return;
    }
}
