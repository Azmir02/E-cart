import Products from '../Models/Productmodels.js'


const idcontroller = async (req, res)=>{
    let product = await Products.findById(req.params.id)
    res.send(product)
}

export default idcontroller