import jwt from "jsonwebtoken"
export default {
    generateToken(userData) {
        return {
            access: jwt.sign(userData, process.env.AccessToken, { expiresIn: '1h' }),
            refresh: jwt.sign(userData, process.env.RefreshToken, { expiresIn: '2d' })
        }
    },
    tokenValidator(token, type = "access") {
        try {
            const secret = type === "access" ? process.env.AccessToken : type === "refresh" ? process.env.RefreshToken : null;
            return jwt.verify(token, secret);
        }
        catch (e) {
            return null;
        }
    }


}
