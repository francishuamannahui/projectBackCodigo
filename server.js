import express from "express";
import cors from "cors";
import corpusmed from "./api/corpusmed.route.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/apimp/v1/", corpusmed)
app.use("*",(req, res) => res.status(400).json({
        error: "No encontrado"
    }))

export default app;
