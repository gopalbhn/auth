import dotenv from "dotenv"
dotenv.config();
import ConnectDB from "./db/connection.js";
import app from "./app.js";
import serverless from "serverless-http";
const PORT = process.env.PORT || 3000;

ConnectDB()
.then(()=>{
  
 console.log("Database Connected");

})
.catch((err)=>{
    console.log("Internal Server Error",err.message)
})

export default app