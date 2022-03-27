import Pmodel from "../Models/Pslidermodel.js"

const psliders = async (req,res)=>{
    const productslides = await Pmodel.find()
    res.send(productslides)
}


export default psliders