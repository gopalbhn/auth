import express from "express"
import userRouter from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173","https://auth-eight-taupe.vercel.app"],
    credentials:true
}))

app.use('/api/user',userRouter)

export default app;