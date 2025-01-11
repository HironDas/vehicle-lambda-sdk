import { it, expect, describe, jest } from "@jest/globals";
import axios from "axios";
import { User } from "../../models/user";
import { UserServices } from "../user-services";
import type { Response } from "../../models/user";
jest.mock('axios');

const mockedAxios = jest.mocked(axios);

describe("User Services", () => {
    it("should signup a user", async () => {
        mockedAxios.post.mockResolvedValue({ data: { message: "User signed up" }, status: 201 });
        let user: User = { username: "shupti", password: "1234", phone: "123456789" };
        let response: Response = await new UserServices(process.env.BASE_URL as string).signup(user);

        expect(response.message).toBe("User signed up");
    });
});