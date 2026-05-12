import {router} from "express";
import {loginUser, loginuser ,registerUser} from "../controllers/User.controller.js"
import { upload } from "../middlewares/multer.middlewares.js";
import { VerifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router()

router.route("/register").post(
   upload.fields([
     {
        name : "avatar",
        maxCount: 1

     },
     {
        name : "coverimage",
        maxCount : 1
     }
   ]),
    registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(VerifyJWT , logoutUser)
export default router