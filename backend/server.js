import express from 'express'
import popupimg from './Popupdata.js'
import banner_js from './Banner.js'
import numbers from './Phone.js'
import data from './Data.js'
const app = express()

app.use(express.json())

app.get('/products', function (req, res) {
  res.send(data)
})

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

//For Dynamic Route
app.get('/products/:slug', function (req, res) {
  let product = data.find((item)=>{
    if(item.slug == req.params.slug){
      return item
    }
  })
  res.send(product)
})
app.get('/:id', function (req, res) {
  let product = data.find((item)=>{
    if(item._id == req.params.id){
      return item
    }
  })
  res.send(product)
})





const Port = process.env.PORT || 8000

app.listen(Port)