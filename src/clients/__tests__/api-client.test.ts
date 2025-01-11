import { ApiClient } from "../api-client";
import { describe, it, jest, expect, beforeEach } from "@jest/globals";
import type { Session } from "../../models/user";
// import axios from 'axios';

//jest.mock('axios');
//const mockedAxios = jest.mocked(axios);

//type Data = { token: string };
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

        let client = new Client(process.env.BASE_URL as string);
        let login = { "username": 'hiron', "password": '1234' };

        await expect(client.invoke<Session>("/login", "post", login)).resolves.toBeTruthy;

        return client.invoke<Session>("/login", "post", login).then((response) => {
            console.log(response);
            // client.setToken(response.token);
            // console.log(localStorage.token);
            expect(response.token).toBeTruthy;
        });

    });

    it('should set the token', () => {
        let client = new Client(process.env.BASE_URL as string);
        client.setToken("hirondas");
        console.log(localStorage.token);
        expect(localStorage.token).toBeTruthy;
    });
})