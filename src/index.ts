import { ApiClient } from "./clients/api-client";
import { History, UndoHistory } from "./models/transaction";
import { TransactionServices } from "./services/transaction-services";
import { UserServices } from "./services/user-services";
import { VehicleServices } from "./services/vehicle-services";
import { applyMixins } from "./util/helper";
import {User, UserLogin, Session, ChangePassword, Response} from "./models/user";

class VehicleManagementSDK extends ApiClient { };

interface VehicleManagementSDK extends VehicleServices, TransactionServices, UserServices { };

applyMixins(VehicleManagementSDK, [VehicleServices, TransactionServices, UserServices]);

export {History, UndoHistory, User, UserLogin, Session, ChangePassword, Response};
export default VehicleManagementSDK;