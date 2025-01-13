import { Response } from "../../models/user";
import { UserServices } from "../../services/user-services";
import { it, expect, describe } from "@jest/globals";

describe("User Services", () => {
    it.skip("should signup return create user confirm message", async () => {
        let user = { username: "shupti", password: "1234", phone: "123456789" };
        let userServices = new UserServices(process.env.BASE_URL as string);

        let response: Response = await userServices.signup(user);
        console.log(response);

        expect(response.message).toBe("Signup successful!!");
        expect(response).toHaveProperty("message");
    });

    it("should login return user token in message", async () => {
        let login = { username: "shupti", password: "12345" };
        let userServices = new UserServices(process.env.BASE_URL as string);

        let response = await userServices.login(login);
        console.log(response);

        expect(response).toHaveProperty("message");
    });

    it("should resolve with a change password successs message", async () => {
        let changge_pass = { old_password: "12345", new_password: "12345" };
        let userServices = new UserServices(process.env.BASE_URL as string);

        let response = await userServices.changePassword(changge_pass);
        console.log(response);

        expect(response.message).toBe("Password Changed!!");
    });

    it("should reject with a change password error message", async () => {
        let changge_pass = { old_password: "1234", new_password: "12345" };
        let userServices = new UserServices(process.env.BASE_URL as string);

        try {
            await userServices.changePassword(changge_pass);
        } catch (e) {
            console.log(e);
            expect(e.message).toBe("Password is not valid!!!");
            expect(e.name).toBe("BadRequestError");
            expect(e.code).toBe("BAD_REQUEST");
        }
    });

    it("should resolve clear session success message", async () => {
        let userServices = new UserServices(process.env.BASE_URL as string);

        let response = await userServices.clearSession();
        console.log(response);

        expect(response).toHaveProperty("message");
        expect(response.message).toBe("All Sessions of the user shupti is deleted");
    });
});