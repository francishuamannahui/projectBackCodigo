import express from "express";

import LoginCrtl from "./login.controllers.js"
import ClienteCtrl from "./clientes.controllers.js"
const router = express.Router();
router.route("/login")
.post(LoginCrtl.apiGetLogin)
router.route("/clientes")
.post(ClienteCtrl.apiPostCliente)


export default router