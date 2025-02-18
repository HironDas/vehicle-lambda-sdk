import axios, { AxiosError, AxiosHeaderValue, AxiosInstance, AxiosRequestConfig } from "axios";
// import * as pbkdf2 from "pbkdf2";
import * as aesjs from "aes-js";
import UnauthorizedError from "../errors/unauthorized-error";
import ForbiddenError from "../errors/forbidden-error";
import InternalServerError from "../errors/internal-server-error";
import BadRequestError from "../errors/bad-request-error";
import NotfoundError from "../errors/notfound-error";
import GatewayTimeoutError from "../errors/getway-timeout-error";
import SDKError from "../errors/sdkerror";


export abstract class ApiClient {
    private token: string;
    protected httpClient: AxiosInstance;
   


    constructor(baseUrl: string) {
        this.httpClient = axios.create({ baseURL: baseUrl });
        this.requestInterceptor();
        this.responseInterceptor();
    }

    private requestInterceptor() {
        this.httpClient.interceptors.request.use((config) => {
            if (!!this.token) {
                config.headers.Authorization = this.token;
            } else if (!!window.localStorage && !!window.localStorage.getItem("token")) {
                this.token = this.decrypt(window.localStorage.getItem("token"));
                config.headers.Authorization = this.token;
            }
            return config;
        });
    }

    private responseInterceptor() {
        this.httpClient.interceptors.response.use((response) => {
            // response.headers["Content-Type"] = "Application/json";
            return response;
        }, function (error) {
            console.log(error.response.data);
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                return Promise.reject(new BadRequestError(error.response.data.message as string, "Invalid request, the request JSON format is not valid"));
            }
            else if (axios.isAxiosError(error) && error.response?.status === 401) {
                return Promise.reject(new UnauthorizedError("Unauthorized! Please login", "Token is not valid"));
                // window.location.href = "/login";
            } else if (axios.isAxiosError(error) && error.response?.status === 403) {
                return Promise.reject(new ForbiddenError("Forbidden! Please login", "Token is not valid"));
            } else if (axios.isAxiosError(error) && error.response?.status === 404) {
                return Promise.reject(new NotfoundError("Not Found!", "The requested resource was not found"));
            } else if (axios.isAxiosError(error) && error.response?.status === 504) {
                return Promise.reject(new GatewayTimeoutError("Gateway Timeout!", "The request took too long to complete"));
            }   
            else if (axios.isAxiosError(error) && error.response?.status >= 500) {
                return Promise.reject(new InternalServerError("Internal Server Error", "Something went wrong"));
            }
            return Promise.reject(new SDKError(error.response?.data, "UNKNOWN_ERROR", `The status code is ${error.response?.status}`));
        })
    }

    /**
     * Makes an HTTP request using the specified URL, method, and optional data.
     * 
     * @template T - The expected response type.
     * @param {string} url - The URL to send the request to.
     * @param {string} [method] - The HTTP method to use (e.g., 'get', 'post'). Defaults to 'get'.
     * @param {Object} [data] - The optional request payload for methods like 'post' or 'put'.
     * @returns {Promise<T>} - A promise that resolves to the response data of type T.
     */
    protected async invoke<T>(url: string, method?: string, data?: Object): Promise<T> {
        const config: AxiosRequestConfig = {
            method: method || "get",
            url: url,
            headers: {
                "Content-Type": "application/json"
            }
        };
        if (!!data) {
            config.data = data;
        }
        try {
            let response = await this.httpClient(config);
            if (response.status == 200 || response.status == 201) {
                return response.data as T; //response.data as T;
            } 
            return Promise.reject(response);
        } catch (e) {
            throw e;
        }

    }

    private encrypt(token: string): string {
        if (token != undefined) {
            let key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //this.generateKey("Hir0n", "$alt");
            var textBytes: Uint8Array = aesjs.utils.utf8.toBytes(token);

            // The counter is optional, and if omitted will begin at 1
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedBytes = aesCtr.encrypt(textBytes);

            // To print or store the binary data, you may convert it to hex
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            return encryptedHex;
        } else {
            throw Error("The token is not set yet!");
        }
    }

    private decrypt(hash: string): string {
        let key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];// this.generateKey("Hir0n", "$alt");
        var encryptedBytes = aesjs.utils.hex.toBytes(hash);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText;
    }

    // private generateKey(password: string, salt: string): Buffer {
    //     return pbkdf2.pbkdf2Sync(password, salt, 1, 128 / 8, 'sha512');
    // }

    protected setToken(token: string) {
        this.token = token;

        if (!!localStorage) {
            localStorage.setItem("token", this.encrypt(this.token));
        }
    }

}