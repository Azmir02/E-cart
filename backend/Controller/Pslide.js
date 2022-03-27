import Pmodel from "../Models/Pslidermodel.js"
import Productslider from "../Productslider.js"


const Pslide = async (req,res)=>{
    await Pmodel.deleteMany({})
    let pslider = await Pmodel.insertMany(Productslider)
    res.send(pslider)
}

export default Pslide