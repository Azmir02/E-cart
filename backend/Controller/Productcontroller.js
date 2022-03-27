import data from '../Data.js'
import Products from '../Models/Productmodels.js'

const productcontroller = async (req,res)=>{
    await Products.remove({})
    const product = await Products.insertMany(data)
    res.send(product)
}

export default productcontroller