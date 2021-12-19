import express from "express";

import LoginCrtl from "./login.controllers.js"
const router = express.Router();
router.route("/login")
.post(LoginCrtl.apiGetLogin)

export default router