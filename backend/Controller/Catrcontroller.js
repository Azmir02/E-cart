import Catmodal from "../Models/Catmodals.js"

const Catcontroller = async (req,res)=>{
    let data = {
        catagories: req.body.catagories,
        owner: req.body.owner
    }

    const catdata = await new Catmodal(data)
    catdata.save()
}

export default Catcontroller