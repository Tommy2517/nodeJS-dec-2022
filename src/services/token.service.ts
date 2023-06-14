import * as jwt from "jsonwebtoken";

import { ITokensPair } from "../types/token.types";

class TokenService {
  public generateTokenPair(
    payload: Record<string, string | number>
  ): ITokensPair {
    const accessToken = jwt.sign(payload, "jwtAccess", { expiresIn: "15m" }); //life time access
    const refreshToken = jwt.sign(payload, "jwtRefresh", { expiresIn: "30d" }); //life time refresh

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
