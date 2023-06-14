import { IUser } from "./user.type";

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

//Pick<IUser, "password" - создает новый интерфейс в котором не будет указанного поля
//Omit<IUser, "password" - создает новый интерфейс в котором будет только указанне поле
