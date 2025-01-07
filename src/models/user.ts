export type User = { username: string; password: string; phone: string };
export type UserLogin = Omit<User, 'phone'>;
export type session = {token: string}; 