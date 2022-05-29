import express from 'express'
import usergetcontroller from '../Controller/Usercontroller.js'
import signupcontroller from '../Controller/Signupcontroller.js'
import updateuser from '../Controller/Updateuser.js'


const userroutes = express.Router()

userroutes.post('/userinfo',usergetcontroller)
userroutes.post('/usersignup',signupcontroller)
userroutes.put('/:id',updateuser)


export default userroutes