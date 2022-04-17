import Popupimg from "../Models/Popupmodel.js";
import popupimg from "../Popupdata.js";

const popupcontroller = async (req,res)=>{
    await Popupimg.deleteMany({})
    let popupimages = await Popupimg.insertMany(popupimg)
    res.send(popupimages)
}

export default popupcontroller