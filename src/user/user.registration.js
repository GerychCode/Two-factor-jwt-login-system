import userData from "../database/user.data.js";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import jwtService from "../service/jwt.service.js";

export default async (req, res, next) => {
    try {
        const {login, email, password} = req.body;
        const hash = await bcrypt.hash(password, 2);
        let secret = speakeasy.generateSecret({length: 15});
        const registration = await userData.createUser(login, email, hash, secret.base32);
        const tokens = jwtService.generateToken({login, email, id: registration});
        await userData.saveRefreshToken({id: registration, token: tokens.refresh});
        res.cookie("refreshToken", tokens.refresh, {httpOnly: true}).json({secret: secret.base32, url: `https://localhost:3001/user/qr?secret=${secret.base32}&name=${login}`, accessToken: tokens.access});
    }
    catch (e) {
        next(e);
    }
}
