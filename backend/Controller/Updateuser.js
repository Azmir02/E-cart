import users from "../Models/Usersmodel.js"

const updateuser = async(req,res)=>{
    users.findByIdAndUpdate(req.params.id,{new: true},{isVendor: true},function(err, docs){
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
    }
   })
   
}

export default updateuser