# Vehicle Lambda SDK

Welcome to the Vehicle Lambda SDK project! This SDK provides tools and utilities to interact with vehicle data and perform various operations using AWS Lambda.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the Vehicle Lambda SDK, you can use npm:

```bash
npm i @hirondas/vehicle-management-sdk
```

Or clone the repository and install dependencies:

```bash
git clone https://github.com/HironDas/vehicle-lambda-sdk
cd vehicle-lambda-sdk
npm install
```

## Usage

Here is a basic example of how to use the SDK:

```javascript
import VehicleLambdaSDK from '@hirondas/vehicle-management-sdk';

const sdk = new VehicleLambdaSDK('base-url');

sdk.login({username:'username', password: 'password'})
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });

sdk.getVehicle()
.then(data =>{
    console.log(data)
})
.catch(e => console.error(e));
```

## Features

- Retrieve vehicle data
- Perform operations using AWS Lambda
- Easy integration with existing projects

## Contributing

We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.