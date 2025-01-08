import { ApiClient } from "../apiClient";
import { describe, it, jest, expect, beforeEach } from "@jest/globals";
import type { Session } from "../../models/user";
// import axios from 'axios';

//jest.mock('axios');
//const mockedAxios = jest.mocked(axios);

//type Data = { token: string };

beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        }, writable: true,
    });
});

describe("ApiClient", () => {
    it('invoke a GET request', async () => {

        class Client extends ApiClient {
            constructor(url: string) {
                super(url);
            }
        };
        //const response = { status: 200, data: '{ message: "Hello world" }' };
        //mockedAxios.get.mockResolvedValue(Response);

        let client = new Client("https://o8060dqql1.execute-api.ap-south-1.amazonaws.com");
        let login = { "username": 'hiron', "password": '1234' };

        await expect(client.invoke<Session>("/login", "post", login)).resolves.toBeTruthy;

    })
})