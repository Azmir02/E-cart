import Users from "../Models/Usersmodel.js"
import Userdata from "../Usersdata.js"

const usercontroller = async(req,res)=>{
    await Users.remove({})
    let userinfo = await Users.insertMany(Userdata)
    res.send(userinfo)
}

export default usercontroller