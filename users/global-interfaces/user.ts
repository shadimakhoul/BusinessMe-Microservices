import { accessStatuss, accessTypes } from "../instance";

export interface User {
    username: string,
    email: string,
    phoneNumber: string,
    password: string,
    salt: string,
    accountType: accessTypes,
    accountStatus: accessStatuss,
    lastLogin: Date,
    created_at: Date,
    updated_at: Date,
}

export interface TokenPair{
    accessToken: string,
    refreshToken: string
}

export interface SecurePassword{
    hashedPassword: string,
    salt: string
}