import { ApiClient } from "../clients/api-client";
import { User, UserLogin, Session, ChangePassword, Response } from "../models/user";

export class UserServices extends ApiClient {

    /**
     * Registers a new user and returns a message
     * @param user the user's information
     * @returns a message indicating the success or failure of the operation
     */
    async signup(user: User): Promise<Response> {
        try{
            const response : Response = await this.invoke<Response>("/signup", "post", user);
           // console.log(response);
            return response as Response;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Logs in a user
     * @param login the user's login information
     * @returns a response message if the login is successful
     */
    async login(login: UserLogin): Promise<Response> {
        try {
            const response = await this.invoke<Session>("/login", "post", login);
            this.setToken(response.token);
            return {message: "Login successful"} as Response;
        } catch (e) {
            throw e;
        }

    }

    /**
     * Changes the user's password
     * @param changge_pass the user's current and new password information
     * @returns a message indicating the success or failure of the password change operation
     */
    async changePassword(changge_pass: ChangePassword): Promise<Response> {
        try {
            const response = await this.invoke<Response>("/pass", "patch", changge_pass);
            return response;
        } catch (e) {
            throw e;
        }

    }

    /**
     * Deletes the user's session
     * @returns a message indicating the success or failure of the operation
     */
    async clearSession() {
        try{
            const response = await this.invoke<Response>("/session", "delete");
            return response;
        } catch (e) {
            throw e;
        }
    }
}