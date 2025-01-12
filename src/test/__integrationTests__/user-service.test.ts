import { Response } from "../../models/user";
import { UserServices } from "../../services/user-services";
import { it, expect, describe } from "@jest/globals";

describe("User Services", () => {
    it("should signup return create user confirm message", async () => {
        let user = { username: "shupti", password: "1234", phone: "123456789" };
        let userServices = new UserServices(process.env.BASE_URL as string);

        let response: Response = await userServices.signup(user);
        console.log(response);

        expect(response.message).toBe("Signup successful!!");
        expect(response).toHaveProperty("message", "Signup successful!!");
    });
});