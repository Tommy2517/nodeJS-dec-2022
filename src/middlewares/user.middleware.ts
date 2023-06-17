import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models/User.mode";

class UserMiddleware {
  public async isUserExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body });
      if (!user) {
        throw new ApiError("User not found", 422);
      }

      req.res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UserMiddleware();
