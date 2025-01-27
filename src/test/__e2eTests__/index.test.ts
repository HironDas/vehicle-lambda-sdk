import SDK from "../../index";
import { expect, it, describe } from  "@jest/globals";

describe("SDK", () => {
    it("should login", async () => {
        const sdk = new SDK(process.env.BASE_URL as string);
        const userLogin = {username: "hiron", password: "1234"};
        const result = await sdk.login(userLogin);

        console.log(result);
        expect(result).toHaveProperty("message");
    });


    it("should get all vehicles", async () => {
        const sdk = new SDK(process.env.BASE_URL as string);
        const result = await sdk.getVehicles();

        console.log(result);
        expect(result[0]).toHaveProperty("vehicle_no");
    });
});