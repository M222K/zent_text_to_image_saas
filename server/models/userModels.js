import mongoose, { mongo } from 'mongoose'

//create schema  for the user
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    creditBalance:{type:Number,default:5},
})

//if the model i already available it will use the model or else create a new one
const userModel=mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;