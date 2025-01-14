import { Response } from '../models/user';
import { ApiClient } from '../clients/api-client'; // Adjust the import path as necessary
import { UpdateVehicle, Vehicle } from '../models/vehicle';

/**
 * VehicleServices class to handle vehicle-related operations.
 */
export class VehicleServices extends ApiClient {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    /**
     * Adds a new vehicle.
     * @param {Vehicle} vehicle - The vehicle to add.
     * @returns {Promise<Response>} - The response from the API.
     */
    async addVehicle(vehicle: Vehicle): Promise<Response> {
        try {
            const response = await this.invoke<Response>('/vehicles', "put", vehicle);
            return response;
        } catch (error) {
            console.error('Error adding vehicle:', error);
            throw error;
        }
    }

    /**
     * Retrieves all vehicles.
     * @returns {Promise<Vehicle[]>} - The list of vehicles.
     */
    async getVehicles(): Promise<Vehicle[]> {
        try {
            const response = await this.invoke<Vehicle[]>(`/vehicles`, "get");
            return response;
        } catch (error) {
            console.error('Error retrieving vehicles:', error);
            throw error;
        }
    }

    /**
     * Updates an existing vehicle.
     * @param {UpdateVehicle} vehicle - The vehicle to update.
     * @returns {Promise<Response>} - The response from the API.
     */
    async updateVehicle(vehicle: UpdateVehicle): Promise<Response> {
        try {
            const response = await this.invoke<Response>(`/vehicles`, "patch", vehicle);
            return response;
        } catch (error) {
            console.error('Error updating vehicle:', error);
            throw error;
        }
    }
}
