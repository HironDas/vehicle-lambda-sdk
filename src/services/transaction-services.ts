import { UpdateVehicle } from '../models/vehicle';
import { ApiClient } from '../clients/api-client';
import { UndoHistory } from '../models/transaction';
import { History } from '../models/transaction';
import { Response } from '../models/user';

export type FeeType = 'fitness' | 'tax' | 'insurance' | 'route';

export class TransactionServices extends ApiClient {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async payFee(type: FeeType, vehicle: UpdateVehicle): Promise<Response> {
        // Implement the logic to pay fee
        // Example:
        return this.invoke<Response>(`\pay?type=${type}`, 'post', vehicle);
    }

    async getHistory(): Promise<History[]> {
        // Implement the logic to get transaction history
        // Example:
        return this.invoke<History[]>(`/history`, 'get');
    }

    async undoHistory(history: UndoHistory): Promise<Response> {
        // Implement the logic to undo a transaction
        // Example:
        return this.invoke<Response>('/history', "delete", history);
    }
}