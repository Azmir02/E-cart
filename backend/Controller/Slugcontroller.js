import Products from '../Models/Productmodels.js'

const slugcontroller = async (req,res)=>{
    let product = await Products.findOne({slug: req.params.slug})
    if(product){
        res.send(product)
    }
    else{
        res.status(404).json({message: "Slug not found"})
    }
}


export default slugcontroller