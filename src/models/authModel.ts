import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

export default mongoose.model("")