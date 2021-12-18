import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import Corpuesmed from "./dao/corpusmedDAO.js";
import Laboratorios from "./dao/laboratoriosDAO.js";
import Almacenes from "./dao/almacenDAO.js";
import Usuarios from "./dao/usuarioDAO.js";
import Cliente from "./dao/clienteDAO.js";
import Pedidos from "./dao/pedidosDAO.js";
import Login from "./dao/loginDAO.js";

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 9600

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,{
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await Corpuesmed.injectDB(client)
    await Laboratorios.injectDB(client)
    await Almacenes.injectDB(client)
    await Usuarios.injectDB(client)
    await Cliente.injectDB(client)
    await Pedidos.injectDB(client)
    await Login.injectDB(client)
    app.listen(port,()=> {
        console.log(`Escuchando en el puerto => ${port}`)
    })
})
