import Order from "../Models/Ordermodel.js";


const Orderidcontroller = async (req,res)=>{
    const idorder = await Order.findById(req.params.id)
    if(idorder){
        res.send(idorder)
    }
    else{
        res.status(404).send({msg: 'orderid not found'})
    }
}

export default Orderidcontroller