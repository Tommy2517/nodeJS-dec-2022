import { Router } from "express";

const router = Router();
router.post('/register', authContgoller.register);
export const authRouter = router;
