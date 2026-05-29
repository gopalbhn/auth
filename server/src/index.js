import dotenv from "dotenv"
dotenv.config();

import express from "express"
import serverless from "serverless-http"

const app = express()

app.get("/api/user/test", (req, res) => {
  res.json({ message: "function is alive" })
})

export default serverless(app)