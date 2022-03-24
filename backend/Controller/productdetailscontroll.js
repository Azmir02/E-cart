import Products from '../Models/Productmodels.js'

const products = async (req,res)=>{
    const product = await Products.find()
    console.log(product);
    res.send(product)
}


export default products