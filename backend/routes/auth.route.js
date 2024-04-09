
import { Router } from "express";
import { createAccount } from "../controller/auth.controller.js";

const router=Router()

router.post('/create-account',createAccount)


export default router