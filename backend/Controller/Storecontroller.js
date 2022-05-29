import Storemodal from "../Models/Storemodal.js"

const Storecontroller = async (req,res)=>{
    let data = {
        storename: req.body.storename,
        owner: req.body.owner
    }

    const storedata = await new Storemodal(data)
    storedata.save()
}

export default Storecontroller