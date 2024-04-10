import { Router } from "express";
import verifyUser from "../utility/verifyUser.utility.js";
import { updateAccount,logOut ,changePassword} from "../controller/user.controller.js";


const router=Router()

router.post('/logout-account',verifyUser,logOut)
router.put('/update-account/:userID',verifyUser,updateAccount)
router.patch('/change-password/:userID',verifyUser,changePassword)



export default router