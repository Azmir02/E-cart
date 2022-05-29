import mongoose from "mongoose";


const Schema = mongoose.Schema

const storemodel = new Schema({
    storename: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const  Storemodal = mongoose.model('storemodal',storemodel)

export default Storemodal