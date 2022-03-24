import express from 'express'
import productcontroller from '../Controller/productdetailscontroll.js'
import idcontroller from '../Controller/Idcontroller.js'

const Productrouter = express.Router()


Productrouter.get('/products',productcontroller)
Productrouter.get('/:id',idcontroller)



export default Productrouter