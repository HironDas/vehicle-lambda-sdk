export type User = { username: string; password: string; phone?: string };
export type UserLogin = Omit<User, 'phone'>;
export type Session = { token: string };
export type ChangePassword = { old_password: string; new_password: string };
export type Response = {
    message: string;
}