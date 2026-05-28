import { Schema,model } from  "mongoose";
import bcrypt from "bcrypt"
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password,10)
    return;
})

userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}

const User = model("User",userSchema);
export default User;