export type Vehicle = {
    vehicle_no: string,
    owner: string,
    "tax_date": string,
    "fitness_date": string,
    "insurance_date": string,
    "route_date": string
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type UpdateVehicle = PartialBy<Vehicle, "tax_date" | "fitness_date" | "insurance_date" | "route_date">;
