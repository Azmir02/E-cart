import Products from '../Models/Productmodels.js'
import Pmodel from '../Models/Pslidermodel.js'

const slugcontroller = async (req,res)=>{
    let product = await Products.findOne({slug: req.params.slug})
    let pslider = await Pmodel.findOne({slug: req.params.slug})
    if(product){
        res.send(product)
    }
    else if(pslider){
        res.send(pslider)
    }
    else{
        res.status(404).json({message: "Slug not found"})
    }
}


export default slugcontroller