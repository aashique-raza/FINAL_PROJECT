
import { Router } from "express";
import { createAccount,logOut,loginAccount,google } from "../controller/auth.controller.js";

const router=Router()

router.post('/create-account',createAccount)
router.post('/login-account',loginAccount)
router.post('/logout-account',logOut)
router.post('/googlelogin',google)


export default router