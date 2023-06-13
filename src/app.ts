import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors";
import { userRouter } from "./routers/user.router";
import { authRouter } from "./routers/auth.router";

const app = express();

app.use(express.json()); //что то читает, мб джейсон, обязателен.
app.use(express.urlencoded({ extended: true })); //так же

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Example app listening on port ${configs.PORT}`);
});

//якось так