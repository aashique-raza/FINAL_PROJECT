
import { Router } from "express";
import { createAccount,loginAccount } from "../controller/auth.controller.js";

const router=Router()

router.post('/create-account',createAccount)
router.post('/login-account',loginAccount)


export default router