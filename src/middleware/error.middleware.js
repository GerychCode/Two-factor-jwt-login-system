import ApiErrors from "../utils/Api_Error.js"

export default (err, req, res, next) => {
    if(err instanceof ApiErrors) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    console.log(err);
    return res.status(500).json({message: "Внутренняя ошибка сервера"});
}