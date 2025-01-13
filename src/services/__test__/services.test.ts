import { it, expect, describe, jest } from "@jest/globals";
import axios from "axios";
import { User } from "../../models/user";
import { UserServices } from "../user-services";
import type { ChangePassword, Response, Session, UserLogin } from "../../models/user";
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios', () => ({
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
}));

const mockedAxios = new MockAdapter(axios);

describe("User Services", () => {
    it("should signup return create user confirm message", async () => {
        let user: User = { username: "shupti", password: "1234", phone: "123456789" };

        mockedAxios.onPost("/signup").reply(201, { message: "User signed up" });

        let response: Response = await new UserServices("http://localhost:3000").signup(user);
        expect(response.message).toBe("User signed up");

    });

    it("should singup return user already exists message", async () => {
        let user: User = { username: "shupti", password: "1234", phone: "123456789" };

        mockedAxios.onPost("/signup").reply(400, { message: "User already exists" });

        try {
            await new UserServices("http://localhost:3000").signup(user);
        } catch (e) {
            console.log(e);
            expect(e.message).toBe("User already exists");
            expect(e.name).toBe("BadRequestError");
            expect(e.code).toBe("BAD_REQUEST");
        }

    });

    it("should login return success message", async () => {
        let login: UserLogin = { username: "shupti", password: "1234" };

        mockedAxios.onPost("/login").reply(200, { token: "user_token" });

        let response: Response = await new UserServices("http://localhost:3000").login(login);

        console.log(response);
        expect(response.message).toBe("Login successful");
        expect(response).toHaveProperty("message");
    });

    it("should resolve with a change password successs message", async () => {
        let changge_pass: ChangePassword = { old_password: "1234", new_password: "12345" };

        mockedAxios.onPatch("/pass").reply(200, { message: "Password changed" });

        let response: Response = await new UserServices("http://localhost:3000").changePassword(changge_pass);

        expect(response.message).toBe("Password changed");
    });

    it("should reject with a change password error message", async () => {
        let changge_pass: ChangePassword = { old_password: "1234", new_password: "12345" };

        mockedAxios.reset();
        mockedAxios.onPatch("/pass").reply(400, { message: "Invalid password" });

        try {
            await new UserServices("http://localhost:3000").changePassword(changge_pass);
        } catch (e) {
            expect(e.message).toBe("Invalid password");
            expect(e.name).toBe("BadRequestError");
            expect(e.code).toBe("BAD_REQUEST");
        }

    });

    it("should resolve clear session success message", async () => {
        mockedAxios.onDelete("/session").reply(200, { message: "User session cleared" });

        let response: Response = await new UserServices("http://localhost:3000").clearSession();

        expect(response.message).toBe("User session cleared");
    });
});