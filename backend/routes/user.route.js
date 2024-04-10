import { Router } from "express";
import verifyUser from "../utility/verifyUser.utility.js";
import { updateAccount } from "../controller/user.controller.js";


const router=Router()

router.put('/update-account/:userID',verifyUser,updateAccount)

export default router