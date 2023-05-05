import {Router} from "express";
import generate_qr from "../user/user.generate.qr.js";
import reg_middleware from "../middleware/registration.middleware.js";
import userRegistration from "../user/user.registration.js";
import userLogout from "../user/user.logout.js";
import userLogin from "../user/user.login.js";
import userRefresh from "../user/user.refresh.js";
import loginMiddleware from "../middleware/login.middleware.js";

const router = new Router();

router.post('/registration', reg_middleware, userRegistration);
router.post("/login", loginMiddleware, userLogin);
router.post("/logout", userLogout);
router.post("/refresh", userRefresh);
router.get('/qr', generate_qr);
export default router;