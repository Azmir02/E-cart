import Order from "../Models/Ordermodel.js";


const Paycontroller = async (req,res)=>{
    const payorder = await Order.findById(req.params.id)
    if(payorder){
        payorder.isPaid = true,
        payorder.deliverAt = Date.now()
        payorder.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address, 
        }
        const update = await payorder.save()
        res.send(update)
    }
    else{
        res.status(404).send({msg: 'payment invalid'})
    }
}

export default Paycontroller