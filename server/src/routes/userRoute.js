import { Router } from "express";
import { registerUser, loginUser, getInfo, updatePassword, forgetPassword, LogOut, resetPassword } from "../controller/userController.js"
import { authenticateJWT } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", LogOut)
router.get('/me', authenticateJWT, getInfo);
router.put("/update-password", authenticateJWT, updatePassword);
router.post("/forget-password", forgetPassword);
router.post("/reset/:token", resetPassword);

export default router;