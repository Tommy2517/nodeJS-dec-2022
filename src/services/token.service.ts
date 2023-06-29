import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { EActionTokenTypes } from "../enums/action-toke-type.enum";
import { ETokenType } from "../enums/token-type";
import { ApiError } from "../errors";
import { ITokenPayload, ITokensPair } from "../types/token.types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokensPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "60s",
    }); //lifetime access
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    }); //lifetime refresh

    return {
      accessToken,
      refreshToken,
    };
  }
  public checkToken(token: string, type: ETokenType): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case ETokenType.Access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.Refresh:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }
      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateActionToken(
    payload: ITokenPayload,
    tokenType: EActionTokenTypes
  ): string {
    try {
      let secret: string;

      switch (tokenType) {
        case EActionTokenTypes.Forgot:
          secret = configs.JWT_ACCESS_SECRET;
          break;
      }

      return jwt.sign(payload, secret, { expiresIn: "7d" });
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}
export const tokenService = new TokenService();
