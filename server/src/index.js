import dotenv from "dotenv"
import ConnectDB from "./db/connection.js";
dotenv.config();
import app from "./app.js";
const PORT = process.env.PORT || 3000;

ConnectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`App is Running on Port ${PORT}`)
    })
    app.on("error",(err)=>{
        console.log("Failed to start Server",err.message)
    })
})
.catch((err)=>{
    console.log("Internal Server Error",err.message)
})