import userData from "../database/user.data.js";
import ApiError from "../utils/Api_Error.js";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import jwtService from "../service/jwt.service.js";
export default async (req, res, next) => {
    try {
        const {login, password, key} = req.body;
        const account = await userData.findUser(login);
        if(account.length === 1) {
            const passwordValidation = await bcrypt.compare(password, account[0].password);
            if(passwordValidation) {
                let keyValidation = speakeasy.totp.verify({
                    secret: account[0]["2fa_key"],
                    encoding: 'base32',
                    token: key
                });
                if (keyValidation) {
                    const tokens = jwtService.generateToken({login: account[0].login, email: account[0].email, id: account[0].id});
                    await userData.saveRefreshToken({id: account[0].id, token: tokens.refresh});
                    res.cookie("refreshToken", tokens.refresh, {httpOnly: true}).json({accessToken: tokens.access});
                }
                else throw ApiError.badRequest("Двухфакторная авторизация не пройдена");
            }
            else throw ApiError.badRequest("Неверный пароль.")
        }
        else throw ApiError.badRequest("Аккаунт не найден.")
    }
    catch (e) {
        next(e)
    }
}
