import { it, expect, describe, beforeAll } from '@jest/globals';
import { VehicleServices } from "../../services/vehicle-services";
import { UpdateVehicle, Vehicle } from "../../models/vehicle";
import { UserServices } from '../../services/user-services';

describe("Vehicle Services", () => {
    beforeAll(async () => {
        let login = { username: "shupti", password: "12345" };
        await new UserServices(process.env.BASE_URL as string).login(login);
    })
    it.skip("should add a vehicle", async () => {
        let vehicle: Vehicle = {
            "vehicle_no": "DMA-GA-66-6124",
            "owner": "Shamoli Transport",
            "tax_date": "2024-11-01",
            "fitness_date": "2024-11-03",
            "insurance_date": "2024-12-07",
            "route_date": "2024-12-10"
        };

        let response = await new VehicleServices(process.env.BASE_URL as string).addVehicle(vehicle);
        console.log(response);
        expect(response).toHaveProperty("message");
        expect(response.message).toBe("new car is added");
    });

    it("should throw an error when trying to add already existing vehicle", async () => {
        let vehicle: Vehicle = {
            "vehicle_no": "DMA-GA-66-6124",
            "owner": "Shamoli Transport",
            "tax_date": "2024-11-01",
            "fitness_date": "2024-11-03",
            "insurance_date": "2024-12-07",
            "route_date": "2024-12-10"
        };

        try {
            await new VehicleServices(process.env.BASE_URL as string).addVehicle(vehicle);
        } catch (e) {
            console.error(e);
            expect(e.message).toBe("Vehicle already exists");
            expect(e.name).toBe("BadRequestError");
            expect(e.code).toBe("BAD_REQUEST");
            console.error(e.details);
        }
    });

    it("should get all vehicles", async () => {
        let vehicles = await new VehicleServices(process.env.BASE_URL as string).getVehicles();
        // console.log(vehicles);
        expect(vehicles).toHaveLength(7);
        expect(vehicles).toBeInstanceOf(Array);
        expect(vehicles[0]).toHaveProperty("vehicle_no");
    });

    it("should update vehicle", async () => {
        let vehicle: UpdateVehicle = {
            "vehicle_no": "DMA-GA-66-6124",
            "tax_date": "2025-05-01",
            "fitness_date": "2025-05-03",
            "insurance_date": "2025-05-07",
        };
        let response = await new VehicleServices(process.env.BASE_URL as string).updateVehicle(vehicle);
        console.log(response);
        expect(response).toHaveProperty("message");
        expect(response.message).toBe("the car is updated");

        let vehicles = await new VehicleServices(process.env.BASE_URL as string).getVehicles();
        let updatdVehicle: Vehicle = vehicles.find(v => v.vehicle_no === "DMA-GA-66-6124") as Vehicle;
        console.log(updatdVehicle);
        expect(updatdVehicle.tax_date).toBe(vehicle.tax_date);
    }); 

});