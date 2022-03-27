import Pmodel from "../Models/Pslidermodel.js"

const psliders = async (req,res)=>{
    const productslides = await Pmodel.find()
    console.log(productslides);
    // res.send(productslides)
}


export default psliders