import dotenv from "dotenv"
import ConnectDB from "./db/connection.js";
dotenv.config();
import app from "./app.js";
const PORT = process.env.PORT || 3000;

ConnectDB()
.then(()=>{
  
 console.log("Database Connected");

})
.catch((err)=>{
    console.log("Internal Server Error",err.message)
})

export default app