import express from 'express'
import productcontroller from '../Controller/Productcontroller.js'

const router = express.Router()


router.get('/',productcontroller)


export default router