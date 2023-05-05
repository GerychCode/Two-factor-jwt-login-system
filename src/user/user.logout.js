import userData from "../database/user.data.js";

export default async (req, res, next) => {
    try {
        const cookie = req.cookies;
        await userData.destroyToken(cookie.refreshToken);
        res.clearCookie("refreshToken");
        res.json().status(200);
    }
    catch(e) {
        next(e)
    }

}
