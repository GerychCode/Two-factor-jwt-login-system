import validator from "validator";
import ApiErrors from "../utils/Api_Error.js";
export default (req, res, next) => {
    try {
        const {login, password, key} = req.body;
        if(login && password && key) {
            if(validator.isAlphanumeric(login, 'en-US')) next();
            else throw ApiErrors.badRequest();
        }
        else throw ApiErrors.badRequest("Недостаточно данных.");
    }
    catch (e) {
        next(e);
    }
}
