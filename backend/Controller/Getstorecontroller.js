import Storemodal from "../Models/Storemodal.js"

const getstorecontroller = async(req,res)=>{
    let Storeinfo = await Storemodal.find({owner: req.params.id})
    res.send(Storeinfo)
}

export default getstorecontroller