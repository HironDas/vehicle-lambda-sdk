import { it, expect, describe, jest } from "@jest/globals";
import axios from "axios";
import { User } from "../../models/user";
import { UserServices } from "../user-services";
import { VehicleServices } from "../vehicle-services";
import type { ChangePassword, Response, Session, UserLogin } from "../../models/user";
import MockAdapter from 'axios-mock-adapter';
import { UpdateVehicle } from "../../models/vehicle";
import { TransactionServices } from "../transaction-services";
import { UndoHistory } from "../../models/transaction";

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

describe("Vehicle Services", () => {
    it("should get all vehicles", async () => {
        mockedAxios.onGet("/vehicle").reply(200, [{
            "vehicle_no": "DMA-GA-66-6666",
            "owner": "City Bank",
            "tax_date": "2024-11-01",
            "fitness_date": "2024-11-03",
            "insurance_date": "2024-12-07",
            "route_date": "2024-12-10"
        },
        {
            "vehicle_no": "DMA-KA-66-6666",
            "owner": "City Bank",
            "tax_date": "2025-01-13",
            "fitness_date": "2025-01-03",
            "insurance_date": "2025-01-17",
            "route_date": "2025-02-10"
        },]);

        let vehicles = await new VehicleServices("http://localhost:3000").getVehicles();

        expect(vehicles).toHaveLength(2);
        expect(vehicles[0].owner).toBe("City Bank");
    });

    it("should update vehicle", async () => {
        let vehicle: UpdateVehicle = {
            "vehicle_no": "DMA-GA-66-6666",
            "tax_date": "2024-11-01"
        };

        mockedAxios.onPatch("/vehicle").reply(200, { message: "Vehicle updated" });

        let response = await new VehicleServices("http://localhost:3000").updateVehicle(vehicle);

        expect(response.message).toBe("Vehicle updated");
    });

    it("should add vehicle", async () => {
        let vehicle = {
            "vehicle_no": "DMA-GA-66-6666",
            "owner": "City Bank",
            "tax_date": "2024-11-01",
            "fitness_date": "2024-11-03",
            "insurance_date": "2024-12-07",
            "route_date": "2024-12-10"
        };

        mockedAxios.onPut("/vehicle").reply(200, { message: "Vehicle added" });

        let response = await new VehicleServices("http://localhost:3000").addVehicle(vehicle);

        expect(response.message).toBe("Vehicle added");
    });
});

describe("Transaction Services", () => {
    it("should pay fee", async () => {
        let vehicle: UpdateVehicle = {
            "vehicle_no": "DMA-GA-66-6666",
            "tax_date": "2024-11-01"
        };

        mockedAxios.onPost("/pay?type=tax").reply(200, { message: "Fee paid" });

        let response = await new TransactionServices("http://localhost:3000").payFee("tax", vehicle);

        expect(response.message).toBe("Fee paid");
    });

    it("should get history", async () => {
        mockedAxios.onGet("/history").reply(200, [{
            "vehicle_no": "DMA-GA-66-6666",
            "transaction_type": "tax",
            "created_at": "2024-11-01",
            "expiry_date": "2025-11-01",
            "payer": "name"
        },
        {
            "vehicle_no": "DMA-KA-66-6666",
            "transaction_type": "tax",
            "exp_date": "2025-01-13",
            created_at: "2025-01-13",
            payer: "name"

        },]);

        let history = await new TransactionServices("http://localhost:3000").getHistory();

        expect(history).toHaveLength(2);
        expect(history[0].vehicle_no).toBe("DMA-GA-66-6666");
    });

    it("should undo history", async () => {
        let history: UndoHistory = {
            "vehicle_no": "DMA-GA-66-6666",
            "transaction_type": "tax",
            "created_at": "2024-11-01"
        };

        mockedAxios.onDelete("/history").reply(200, { message: "History undone" });

        let response = await new TransactionServices("http://localhost:3000").undoHistory(history);

        expect(response.message).toBe("History undone");
    });
});