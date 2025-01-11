import SDKError from "./sdkerror";

export default class extends SDKError{
    constructor(message: string, details?: string){
        super(message, "NOT_FOUND", details);
        this.name = "NotFoundError";
    }
}