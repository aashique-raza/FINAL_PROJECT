import { Router } from "express";
import verifyUser from "../utility/verifyUser.utility.js";
import { updateAccount,logOut } from "../controller/user.controller.js";


const router=Router()

router.post('/logout-account',verifyUser,logOut)
router.put('/update-account/:userID',verifyUser,updateAccount)



export default router