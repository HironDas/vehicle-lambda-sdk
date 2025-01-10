import SDKError from "./sdkerror";

export default class extends SDKError{
    constructor(message:string, details?: string){
        super(message, 'FORBIDDEN', details);
        this.name = 'ForbiddenError';
        
    }
}