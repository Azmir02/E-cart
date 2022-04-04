import users from "../Models/Usersmodel.js"
import bcrypt from 'bcryptjs'
import jwttoken from "../Utils.js"

const signupcontroller = async(req,res)=>{
   let usersignup = new users({
       name: req.body.name,
       email: req.body.email,
       password: bcrypt.hashSync(req.body.password) 
   })
   let datauser = await usersignup.save()

   res.send({
    _id: datauser._id,
    name: datauser.name,
    email: datauser.email,
    password: datauser.password,
    isAdmin: datauser.isAdmin,
    token: jwttoken(datauser)
   })
   
}

export default signupcontroller