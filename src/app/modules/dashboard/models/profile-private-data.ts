import { Subscription } from "./subscription";

export interface ProfilePrivateData {
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  capital: number,
  subscription: Subscription
}
