import express, { Request, Response } from "express";
// import e from "express";
// import * as fs from "fs";
// import * as path from "path";
import * as mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configs } from "./configs/config";
import { User } from "./models/User.mode";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators";

const app = express();

app.use(express.json()); //что то читает, мб джейсон, обязателен.
app.use(express.urlencoded({ extended: true })); //так же

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find().select("-password");

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }
      const createdUser = await User.create(value);

      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
);

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      return res.json(user);
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

app.put(
  "users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { id } = req.params;

      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }

      const updateUser = await User.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" }
      );
      return res.status(200).json(updateUser);
    } catch (e) {
      throw new Error(e.message);
    }
  }
);

app.delete(
  "users/:id",
  async (req: Request, res: Response): Promise<Response<void>> => {
    const { id } = req.body;
    await User.deleteOne({ _id: id });

    return res.sendStatus(200);
  }
);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Example app listening on port ${configs.PORT}`);
});
