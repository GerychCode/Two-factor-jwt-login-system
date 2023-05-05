class ApiErrors extends Error{
    status;
    errors;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static  dataAlreadyInUse(errors = []) {
        return new ApiErrors(400, `Аккаунт с этими данными уже зарегистрирован ${errors.join(", ")}`);
    }
    static  badRequest(message = "", errors = []) {
        return new ApiErrors(400, message, errors);
    }
}

export default ApiErrors