import express from 'express'
import popupimg from './Popupdata.js'
import banner_js from './Banner.js'
import numbers from './Phone.js'
import product_slider from './Productslider.js'
import data from './Data.js'
import seedrouter from './Routes/Seedroutes.js'
import Productrouter from './Routes/Productrouter.js'
import dbconection from './Databaseconnection/Dbconnection.js'

dbconection()

const app = express()
app.use(express.json())

app.use('/api/seed',seedrouter)
app.use('/api', Productrouter)
app.use('/api/productid', Productrouter)

//for discount routes
app.get('/discount', function (req, res) {
  res.send(popupimg)
})

//for banner routes
app.get('/banner', function (req, res) {
  res.send(banner_js)
})
//For phone
app.get('/phone', function (req, res) {
  res.send(numbers)
})

//For slider-latest
app.get('/slider', function (req, res) {
  res.send(product_slider)
})

//For Dynamic Route
app.get('/products/:slug', function (req, res) {
  let product = data.find((item)=>{
    if(item.slug == req.params.slug){
      return item
    }
  })
  res.send(product)
})


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