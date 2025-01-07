import axios, { AxiosInstance } from "axios";
import * as pbkdf2 from "pbkdf2";
import * as aesjs from "aes-js";

export abstract class ApiClient {
    private token: string;
    private httpClient: AxiosInstance;

    constructor(baseUrl: string) {
        this.httpClient = axios.create({ baseURL: baseUrl });

        this.httpClient.interceptors.request.use((config)=>{
            return config;
        });
    }

    private encrypt(token: string): string {
        if (token != undefined) {
            let key = this.generateKey("Hiron", "$alt");
            var textBytes: Uint8Array = aesjs.utils.utf8.toBytes(token);

            // The counter is optional, and if omitted will begin at 1
            var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedBytes: ArrayBuffer = aesCtr.encrypt(textBytes);

            // To print or store the binary data, you may convert it to hex
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            return encryptedHex;
        } else {
            throw Error("The token is not set yet!");
        }
    }

    private decrypt(hash: string): string {
        let key = this.generateKey("Hiron", "$alt");
        var encryptedBytes = aesjs.utils.hex.toBytes(hash);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);

        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText;
    }

    private generateKey(password: string, salt: string): Buffer {
        return pbkdf2.pbkdf2Sync(password, salt, 1, 128 / 8, 'sha512');
    }

    protected setToken(token: string) {
        this.token = token;

        if (!!localStorage) {
            localStorage.setItem("token", this.encrypt(this.token));
        }
    }

}