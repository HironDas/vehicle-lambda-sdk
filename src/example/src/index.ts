import sdk from "@hd/vehicle-management-sdk";


async function App() {    
    const vehicleManagementSDK = new sdk(process.env.BASE_URL);
    const userLogin = {username: "hiron", password: "1234"};
    await vehicleManagementSDK.login(userLogin);
    vehicleManagementSDK.getVehicles().then((vehicles) => {
        console.log(vehicles);
    });
}