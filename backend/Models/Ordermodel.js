import mongoose from "mongoose";


const Schema = mongoose.Schema


const Ordermodel = new Schema({
    orderItems:[
        {
            slug: {
                type: String,
                // required: true
            },
            name:{
                type: String,
                // required: true
            },
            quantity:{
                type: Number,
                // required: true
            },
            price:{
                type: Number,
                // required: true
            },
            image:{
                type: String,
                // required: true
            },
            
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            }
        }
    ],
    shippingaddress:{
        address:{
            type: String,
            // required: true
        },
        city:{
            type: String,
            // required: true
        },
        email:{
            type: String,
            // required: true
        },
        fname:{
            type: String,
            // required: true
        },
        lname:{
            type: String,
            // required: true
        },
        phone:{
            type: Number,
            // required: true
        },
        postal:{
            type: Number,
            // required: true
        },
        state:{
            type: String,
            // required: true
        }
    },
    paymentmethod:{
            type: String,
            // required: true
    },
    productprice: {
        type: Number,
        // required: true
    },
    paymentResult:{
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    deliverAt:{
        type: Date
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        // required: true
    },
    deliverycharge: {
        type: Number,
        // required: true,
    },
    tax:{
        type: Number,
        // required: true,
    }
},
{
    timestamps: true
})

const orders = mongoose.model('orders',Ordermodel)

export default orders