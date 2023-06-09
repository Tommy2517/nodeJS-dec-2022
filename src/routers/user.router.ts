import { NextFunction, Request, Response, Router } from "express";

import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";

const router = Router();

router.get(
  "/",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {

  }
);

router.post(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const createdUser = await User.create(value);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      return res.json(user);
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

router.put(
  "/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const { id } = req.params;

      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      const updateUser = await User.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" }
      );
      return res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { id } = req.body;
      await User.deleteOne({ _id: id });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
);

export const userRouter = router;