import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ICredentials } from "../types/token.types";
import { UserValidator } from "../validators";
import {IUser} from "../types/user.type";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.findAndThrow("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  userMiddleware.isUserExist<ICredentials>("email"),
  authController.login
);

router.post(
  "/changePassword",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.post(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  userMiddleware.isUserExist<IUser>("email"),
  authController.forgotPassword
);

export const authRouter = router;
