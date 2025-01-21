import { TransactionServices } from '../../services/transaction-services';
import { UpdateVehicle } from '../../models/vehicle';
import { UndoHistory, History } from '../../models/transaction';
import { Response } from '../../models/user';
import {describe, it, expect, beforeEach, beforeAll} from '@jest/globals';
import { UserServices } from '../../services/user-services';

describe('TransactionServices', () => {
    let transactionServices: TransactionServices;
    const baseUrl = process.env.BASE_URL as string;

    beforeAll(async() => { 
        let login = { username: "shupti", password: "12345" };
        await new UserServices(baseUrl).login(login);
    });

    beforeEach(() => {
        transactionServices = new TransactionServices(baseUrl);
    });

    it('should pay fee successfully', async () => {
        const vehicle: UpdateVehicle = { vehicle_no: 'DMA-GA-66-6124', tax_date: '2025-05-01' };

        const result: Response = await transactionServices.payFee('tax', vehicle);

        expect(result.message).toEqual('the car tax date is updated');
        //expect(transactionServices.invoke).toHaveBeenCalledWith('/pay?type=tax', 'post', vehicle);
    });

    it('should get transaction history successfully', async () => {

        const result: History[] = await transactionServices.getHistory();

        expect(result).toHaveLength(3);
        //expect(transactionServices.invoke).toHaveBeenCalledWith('/history', 'get');
    });


    it('should undo history successfully', async () => {
        const undoHistory: UndoHistory = { vehicle_no: 'DMA-GA-66-6124', transaction_type: 'tax', created_at: '2025-01-21' };
       

        const result = await transactionServices.undoHistory(undoHistory);

        expect(result.message).toEqual("The transaction undo successfully!!");
        
    });
});