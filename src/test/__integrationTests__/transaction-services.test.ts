import { TransactionServices } from '../../services/transaction-services';
import { UpdateVehicle } from '../../models/vehicle';
import { UndoHistory, History } from '../../models/transaction';
import { Response } from '../../models/user';
import {describe, it, expect, beforeEach, beforeAll} from '@jest/globals';
import { UserServices } from '../../services/user-services';

describe('TransactionServices', () => {
    let transactionServices: TransactionServices;
    const baseUrl = process.env.BASE_URL as string;

    beforeAll(() => { 
        let login = { username: "shupti", password: "12345" };
        new UserServices(baseUrl).login(login);
    });

    beforeEach(() => {
        transactionServices = new TransactionServices(baseUrl);
    });

    it('should pay fee successfully', async () => {
        const vehicle: UpdateVehicle = { vehicle_no: 'DMA-GA-66-6124', tax_date: '2025-05-01' };

        const result: Response = await transactionServices.payFee('tax', vehicle);

        expect(result.message).toEqual('Fee paid successfully');
        //expect(transactionServices.invoke).toHaveBeenCalledWith('/pay?type=tax', 'post', vehicle);
    });

    it('should get transaction history successfully', async () => {

        const result: History[] = await transactionServices.getHistory();

        expect(result).toHaveLength(4);
        //expect(transactionServices.invoke).toHaveBeenCalledWith('/history', 'get');
    });

    // it('should undo history successfully', async () => {
    //     const undoHistory: UndoHistory = { id: '1' };
    //     const response: Response = { success: true, message: 'Transaction undone successfully' };
    //     (transactionServices.invoke as jest.Mock).mockResolvedValue(response);

    //     const result = await transactionServices.undoHistory(undoHistory);

    //     expect(result).toEqual(response);
    //     expect(transactionServices.invoke).toHaveBeenCalledWith('/history', 'delete', undoHistory);
    // });
});