import Popupimg from "../Models/Popupmodel.js";

const popupgetcontroller = async (req,res)=>{
    let popupgetimages = await Popupimg.findOne()
    res.send(popupgetimages)
}

export default popupgetcontroller