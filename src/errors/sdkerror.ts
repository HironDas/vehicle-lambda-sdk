export default class SDKError extends Error{
    public readonly code: string;
    public readonly details?: string;

    constructor(message: string, code: string, details?:string){
        super(message);
        this.code = code;
        this.details = details;
        this.name = "SDKError";

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}