import users from "../Models/Usersmodel.js"
import bcrypt from 'bcryptjs'
import jwttoken from "../Utils.js"

const usergetcontroller = async(req,res)=>{
   let user = await users.findOne({email: req.body.email})
   if(user){
       if(bcrypt.compareSync(req.body.password, user.password)){
          res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              password: user.password,
              isAdmin: user.isAdmin,
              token: jwttoken(user)
          })
          return
       }
   }
   res.status(404).json({error: "invalid email or username"})

   
}

export default usergetcontroller