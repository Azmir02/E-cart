import Order from "../Models/Ordermodel.js";


const Ordercontroller = async (req,res)=>{
    let neworder = new Order({
        orderItems: req.body.orderItems.map((p) => ({...p, product: p._id})),
        shippingaddress: req.body.shippingaddress,
        paymentmethod: req.body.paymentmethod,
        productprice: req.body.productprice,
        deliverycharge: req.body.deliverycharge,
        tax: req.body.tax,
        user: req.body.user
    })

    const order = await neworder.save()

    res.status(201).send({msg: "information order deliverd",order})
}

export default Ordercontroller