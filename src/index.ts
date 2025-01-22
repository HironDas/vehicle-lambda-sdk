import { ApiClient } from "./clients/api-client";
import { TransactionServices } from "./services/transaction-services";
import { UserServices } from "./services/user-services";
import { VehicleServices } from "./services/vehicle-services";
import { applyMixins } from "./util/helper";

class VehicleManagementSDK extends ApiClient{};

interface VehicleManagementSDK extends VehicleServices, TransactionServices, UserServices {};

applyMixins(VehicleManagementSDK, [VehicleServices, TransactionServices, UserServices]);

export default VehicleManagementSDK;