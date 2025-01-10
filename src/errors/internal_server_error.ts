import SDKError from "./sdkerror";

export default class extends SDKError{
    constructor(message: string, details?: string){
        super(message, "INTERNAL_SERVER", details);
        this.name = "InternalServerError";
    }
}