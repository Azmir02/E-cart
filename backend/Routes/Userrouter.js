import express from 'express'
import usergetcontroller from '../Controller/Usercontroller.js'
import signupcontroller from '../Controller/Signupcontroller.js'


const userroutes = express.Router()

userroutes.post('/userinfo',usergetcontroller)
userroutes.post('/usersignup',signupcontroller)


export default userroutes