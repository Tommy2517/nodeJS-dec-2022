import { Request } from "express";

import { User } from "../models/User.mode";

class UserController {
  public async findAll(req: Request, res: Response) {
    try {
      const users = await User.find().select("-password");

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

export const UserController = new UserController();
