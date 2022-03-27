import express from 'express'
import productcontroller from '../Controller/Productcontroller.js'
import popupcontroller from '../Controller/Popupcontroller.js'
import usercontroller from '../Controller/Usergetcontroll.js'
const router = express.Router()


router.get('/',productcontroller)
router.get('/discount',popupcontroller)
router.get('/usersall',usercontroller)


export default router