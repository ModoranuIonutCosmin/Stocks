import { Subscription } from "../../dashboard/models/subscription";

export interface LoginResponseModel {
    firstName: string; 
    lastName: string;
    userName: string;
    email: string;
    token: string;
    subscription: Subscription;
}
