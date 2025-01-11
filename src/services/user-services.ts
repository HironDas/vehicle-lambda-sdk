import { ApiClient } from "src/clients/api-client";
import { User, UserLogin, Session, ChangePassword } from "src/models/user";

export type Response = {
    message: string;
}
export class UserServices extends ApiClient{
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    /**
     * Registers a new user and returns a message
     * @param user the user's information
     * @returns a message indicating the success or failure of the operation
     */
    signup(user: User): Promise<Response> {
        return this.invoke<Response>("/signup", "post", user);
    }

    /**
     * Logs in a user
     * @param login the user's login information
     * @returns a session object containing the user's token
     */
    async login(login: UserLogin): Promise<Session> {
        try{
            const response = await this.invoke<Session>("/login", "post", login);
            this.setToken(response.token);
            return response;
        }catch(e){
            throw e;
        }
         
    }

    /**
     * Changes the user's password
     * @param changge_pass the user's current and new password information
     * @returns a message indicating the success or failure of the password change operation
     */
    changePassword(changge_pass: ChangePassword): Promise<Response> {
        return this.invoke<Response>("/pass", "patch", changge_pass);
    }

    /**
     * Deletes the user's session
     * @returns a message indicating the success or failure of the operation
     */
    clearSession(){
        return this.invoke<Response>("/session", "delete");
    }
}