import SDKError from "./sdkerror";

class BadRequestError extends SDKError{
    constructor(message: string, details?: string){
        super(message, "BAD_REQUEST", details);
        this.name = "BadRequestError";
    }
}

export default BadRequestError;