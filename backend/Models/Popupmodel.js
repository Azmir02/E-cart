import mongoose from 'mongoose';


const Schema = mongoose.Schema

const Popupimg = new Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    heading:{
        type: String,
        required: true
    },
    para:{
        type: String,
        required: true
    }
})

const popupimg = mongoose.model('popupimages',Popupimg)


export default popupimg