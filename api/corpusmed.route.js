import express from "express";
import CorpusmedCtrl from "./corpusmed.controllers.js"
import LaboratoriosCtrl from "./laboratorios.controllers.js"
import AlmacenesCtrl from "./almacen.controllers.js"
import UsuariosCtrl from "./usuarios.controllers.js"
import ClienteCtrl from "./clientes.controllers.js"
import PedidosCtrl from "./pedido.controllers.js"
import LoginCrtl from "./login.controllers.js"
const router = express.Router();

router.route("/corpusmed/").get(CorpusmedCtrl.apiGetCorpusMed)
router.route("/corpusmed/id/:id").get(CorpusmedCtrl.apiCorpusmedByID)
router.route("/laboratorios/").get(LaboratoriosCtrl.apiGetLaboratorios)
router.route("/laboratorios/id/:id").get(LaboratoriosCtrl.apiLaboratoriosByID)

router.route("/usuarios")
.post(UsuariosCtrl.apiPostUsuario)
router.route("/almacenes")
.post(AlmacenesCtrl.apiPostAlmacen)
.get(AlmacenesCtrl.apiGetAlmacenes)
router.route("/clientes")
.post(ClienteCtrl.apiPostCliente)
router.route("/pedidos")
.post(PedidosCtrl.apiPostPedidos)
.put(PedidosCtrl.apiUpdatePedido)
.delete(PedidosCtrl.apiDeletePedido)


export default router