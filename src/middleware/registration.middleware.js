import userData from "../database/user.data.js";
import validator from "validator";
import findCoincidencesInArray from "../utils/find.coincidences.in.array.js";
import apiError from "../utils/Api_Error.js";
import ApiErrors from "../utils/Api_Error.js";

export default async(req, res, next) => {
    try {
        const {login, password, email} = req.body;
        if(login && password && email) {
            if(validator.isAlphanumeric(login, 'en-US') && validator.isAlphanumeric(password, 'en-US') && validator.isEmail(email)) {
                const coincidences = await userData.findUserCoincidences({login, password, email});
                if(coincidences.length === 0) next();
                else {
                    const dataCoincidences = findCoincidencesInArray({login, password, email}, coincidences);
                    throw apiError.dataAlreadyInUse(dataCoincidences);
                }
            }
            else throw ApiErrors.badRequest("Неверный формат данных");

        }
        else throw apiError.badRequest("Недостаточно данных");
    }
    catch (e) {
        next(e);
    }

}