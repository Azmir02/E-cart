import express from 'express'
import usergetcontroller from '../Controller/Usercontroller.js'


const userroutes = express.Router()

userroutes.post('/userinfo',usergetcontroller)


export default userroutes