export type User = {
    _id: string,
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    registrationDate: string,
    groups: [string]
};