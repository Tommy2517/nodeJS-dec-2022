import { IUser } from "./user.type";

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export type ICredentials = Pick<IUser, "email" | "password">;
export type ITokenPayload = Pick<IUser, "name" | "_id">;

//Pick<IUser, "password" - создает новый интерфейс в котором не будет указанного поля
//Omit<IUser, "password" - создает новый интерфейс в котором будет только указанне поле
