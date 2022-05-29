import express from 'express'
import productcontroller from '../Controller/productdetailscontroll.js'
import idcontroller from '../Controller/Idcontroller.js'
import popupgetcontroller from '../Routes/Popupgetcontroller.js'
import psliders from '../Controller/Productslidecontroll.js'
import Storecontroller from '../Controller/Storecontroller.js'
import Catcontroller from '../Controller/Catrcontroller.js'
import getstorecontroller from '../Controller/Getstorecontroller.js'

const Productrouter = express.Router()


Productrouter.get('/',popupgetcontroller)
Productrouter.get('/products',productcontroller)
Productrouter.get('/products/getstore/:id',getstorecontroller)
Productrouter.post('/products/store',Storecontroller)
Productrouter.post('/products/cat',Catcontroller)
Productrouter.get('/pslide',psliders)
Productrouter.get('/:id',idcontroller)



export default Productrouter