import { Request } from "express";
import { User } from "../models/user.model";

export interface TokenPayload {
    userId: string;
    exp: string;
    iat: string;
}

export interface RequestTemporary extends Request{
    user: User 
}