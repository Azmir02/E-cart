import Stripe from "stripe";
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';


const stripe = new Stripe(process.env.STRIP_KEY || "") 

const Strippayecontroller = async (req,res)=>{
   const {token = {}, amount = 0} = req.body

   if(!Object.keys(token).length || !amount){
       res.status(404).send({msg: "Order not comfirmed"})
   }

   const {id: customerId} = stripe.customers.create({
        email: token.email,
        source: token.id
   }).catch(e=>{
       return null
   })

   const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`

   const {charge} = stripe.ChargesResource.create({
        amount: amount,
        currency: "USD",
        customer: customerId,
        recived_email: token.email,
        description: "E-CART Payment"
   },
   {
       idempotencyKey: invoiceId
   })

   if(!charge){
    res.status(404).send({msg: "Not paid"})
   }

   res.status(201).send({msg: "Payment Successfull"})



}

export default Strippayecontroller