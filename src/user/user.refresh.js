import userData from "../database/user.data.js";
import jwtService from "../service/jwt.service.js";
import ApiError from "../utils/Api_Error.js";
export default async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        const tokenValidator = jwtService.tokenValidator(refreshToken, "refresh");
        if(tokenValidator) {
            const tokens = jwtService.generateToken({login: tokenValidator.login, email: tokenValidator.login, id: tokenValidator.id});
            await userData.saveRefreshToken({id: tokenValidator.id, token: tokens.refresh});
            res.cookie("refreshToken", tokens.refresh, {httpOnly: true}).json({accessToken: tokens.access});
        }
        else throw ApiError.badRequest();
    }
    catch(e) {
        next(e)
    }
}
