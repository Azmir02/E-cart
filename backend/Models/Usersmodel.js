import mongoose from "mongoose";


const Schema = mongoose.Schema


const Usermodel = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isVendor:{
        type: Boolean,
        default: false
    }
})

const users = mongoose.model('users',Usermodel)

export default users