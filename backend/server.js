import express from 'express'
import data from './Data.js'
const app = express()

app.use(express.json())

app.get('/products', function (req, res) {
  res.send(data)
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