import SDKError from "./sdkerror";

class UnauthorizedError extends SDKError{
    constructor(message: string, details?: string){
        super(message, "UNAUTHORIZED", details);
        this.name = "UnauthorizedError";
    }
}

export default UnauthorizedError;