import mongoose from "mongoose";

const Schema = mongoose.Schema

const catmodal = new Schema({
    catagories: {
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const Catmodal = mongoose.model('catmodel',catmodal)

export default Catmodal