import express from 'express'
import productcontroller from '../Controller/productdetailscontroll.js'
import idcontroller from '../Controller/Idcontroller.js'
import popupgetcontroller from '../Routes/Popupgetcontroller.js'
import psliders from '../Controller/Productslidecontroll.js'

const Productrouter = express.Router()


Productrouter.get('/',popupgetcontroller)
Productrouter.get('/products',productcontroller)
Productrouter.get('/pslide',psliders)
Productrouter.get('/:id',idcontroller)



export default Productrouter