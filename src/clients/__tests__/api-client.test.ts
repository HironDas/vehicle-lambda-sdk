import { ApiClient } from "../api-client";
import { describe, it, jest, expect, beforeEach } from "@jest/globals";
import type { Session } from "../../models/user";
import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import BadRequestError from "../../errors/bad-request-error";
import SDKError from "../../errors/sdkerror";

jest.mock('axios', () => ({
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
}));

const mockedAxios = new MockAdapter(axios);

class Client extends ApiClient {
    constructor(url: string) {
        super(url);
    }

    invoke<T>(url: string, method?: string, data?: Object): Promise<T> {
        return super.invoke<T>(url, method, data);
    }

    public setToken(token: string): void {
        super.setToken(token);
    }

};

describe("ApiClient", () => {
    it('Should invoke a POST request', async () => {

        let client = new Client("http://localhost:3000");
        let login = { "username": 'hiron', "password": '1234' };

        mockedAxios.onPost("/login").reply(200, { token: "hirondas" });

        await expect(client.invoke<Session>("/login", "post", login)).resolves.toStrictEqual({ token: "hirondas" });

        return client.invoke<Session>("/login", "post", login).then((response) => {
            //console.log(response);
            // client.setToken(response.token);
            // console.log(localStorage.token);
            expect(response).toEqual({ token: "hirondas" });
        });

    });

    it('should invoke an error BAD REQUEST', async () => {
        let client = new Client("http://localhost:3000");
        let login = { "username": 'xxxx', "password": '1234' };

        mockedAxios.onPost("/login").reply(400, { message: "Invalid request, the requested user not vaild" });

        await expect(client.invoke<Session>("/login", "post", login)).rejects
            .toBeInstanceOf(SDKError).catch((error) => {
                // these tests are not EXECURED
                expect(error.message).toBe("Invalid request, the requested user not vaild");
                expect(error.name).toBe("BadRequestError");
                expect(error.code).toBe("BAD_REQUEST");
            });
    });

    it('should throw an error `Internal Server Error`', async () => {
        let client = new Client("http://localhost:3000");
        let login = { "username": 'xxxx', "password": '1234' };

        mockedAxios.onPost("/login").reply(500);

        try {
            await client.invoke<Session>("/login", "post", login);
        } catch (e) {
            expect(e.message).toBe("Internal Server Error");
            expect(e.name).toBe("InternalServerError");
            expect(e.code).toBe("INTERNAL_SERVER");
            expect(e.details).toBe("Something went wrong");
        }
    });

    it('should set the token', () => {
        let client = new Client(process.env.BASE_URL as string);
        client.setToken("hirondas");
        console.log(localStorage.token);
        expect(localStorage.token).toBeTruthy;
    });
})