export type History = {
    "vehicle_no": string,
    "exp_date": string,
    "created_at": string,
    "transaction_type": string,
    "payer": string
}

export type UndoHistory =  Omit<History, "payer"|"exp_date"> & Partial<Pick<History, "payer"|"exp_date">>;