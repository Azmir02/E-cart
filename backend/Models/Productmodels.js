import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Products = new Schema({
    image:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    model:{
        type: String,
    },
    slug:{
        type: String,
        required: true
    },
    desciprtion:{
        type: String,
        required: true
    },
    price:{
        type: Number,
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
    button:{
        type: String,
        required: true
    },
    instock:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    cuponcode:{
        type: String,
    },
    discount:{
        type: String,
        required: true
    },
    discountlimit:{
        type: Number
    },
    totalsale:{
        type: Number,
        required: true
    },
    bestsalepng:{
        type: String
    }
},
{
    timestamps: true
})

const Productmodel = mongoose.model('products',Products);

export default Productmodel