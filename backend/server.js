import express from 'express'
import banner_js from './Banner.js'
import numbers from './Phone.js'
import product_slider from './Productslider.js'
import data from './Data.js'
import seedrouter from './Routes/Seedroutes.js'
import Productrouter from './Routes/Productrouter.js'
import slugroute from './Routes/Slugrouter.js'
import userroutes from './Routes/Userrouter.js'
import Pslider from './Routes/Productslider.js'
import dbconection from './Databaseconnection/Dbconnection.js'

//connect-mongodb
dbconection()

const app = express()
//middleware-js
app.use(express.json())

//product router
app.use('/api/seed',seedrouter)
//product-get router
app.use('/api',Productrouter)
// app.use('/api', Productrouter)
//product-ID router
app.use('/api/productid', Productrouter)
//product-slug router
app.use('/api/products', slugroute)
//for discount routes
app.use('/api/popup',seedrouter)
//for get useradmin routes
app.use('/api/userauth',userroutes)
//For slider-latest
app.use('/api',Pslider)



//for banner routes
app.get('/banner', function (req, res) {
  res.send(banner_js)
})
//For phone
app.get('/phone', function (req, res) {
  res.send(numbers)
})



//For Dynamic Route
// app.get('/products/:slug', function (req, res) {
//   let product = data.find((item)=>{
//     if(item.slug == req.params.slug){
//       return item
//     }
//   })
//   res.send(product)
// })


app.get('/slider/:slug', function (req, res) {
  let productslider = data.find((item)=>{
    if(item.slug == req.params.slug){
      return item
    }
  })
  res.send(productslider)
})

// app.get('/:id', function (req, res) {
//   let product = data.find((item)=>{
//     if(item._id == req.params.id){
//       return item
//     }
//   })
//   res.send(product)
// })




const Port = process.env.PORT || 8000

app.listen(Port)