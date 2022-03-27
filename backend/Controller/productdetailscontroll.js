import Products from '../Models/Productmodels.js'

const products = async (req,res)=>{
    const product = await Products.find()
    res.send(product)
}


export default products