import express from "express";
import cors from "cors";
import middleware from "./api/middlewarelogin.js"
import corpusmed from "./api/corpusmed.route.js"
import validacionToken from "./api/valida.controllers.js"

const app = express()
app.use(cors())
app.use(express.json())


app.use("/apimp/v1/",validacionToken.validar,corpusmed)
app.use("/apimp/v1/",middleware)
app.use("*",(req, res) => res.status(400).json({
        error: "No encontrado"
    }))

export default app;
