import mongoose from "mongoose";

const ConnectDB = async () =>{
        try{
            const connection = await mongoose.connect(process.env.MONGO_URI);
            console.log("Database connected")
        }catch(err){
            console.log("Error in Connecting to Database",err.message);
        }
}

export default ConnectDB