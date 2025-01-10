import SDKError from "./sdkerror";

export default class extends SDKError{
    constructor(message: string, details?: string){
        super(message, "GATEWAY_TIMEOUT", details);
        this.name = 'GatewayTimeoutError';
    }
}