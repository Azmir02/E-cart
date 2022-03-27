import mongoose from "mongoose";


const Schema = mongoose.Schema


const Pslidemodel = new Schema({
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    },
    numberofrating:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})


const Pmodel = mongoose.model("productslider",Pslidemodel)


export default Pmodel