import axios from 'axios'
import React, { useState,useContext, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Store } from '../Store'


const Uploadproduct = () => {
    const {state3,dispatch3} = useContext(Store)
    const [storename,setStorename]= useState("")

    useEffect(()=>{
        let getStoredata = async ()=>{
            let getData = await axios.get(`/api/products/getstore/${state3.userInfo._id}`)
            setStorename(getData.data[0].storename);
        }
        getStoredata()
    },[])

  return (
    <>
        <Form className='mt-5 uploading'>
          

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product name</Form.Label>
              <Form.Control type="text" placeholder="Product name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Tags</Form.Label>
              <Form.Control type="text" placeholder="Product tag" />
          </Form.Group>

            <Form.Group  className="mb-3" controlId="formBasicEmail">
                <Form.Label>Product image</Form.Label>
                <Form.Control type="file" name='avatar' />
                <input className='mt-4' type="submit" value = "Upload"/>
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" placeholder="Product Model" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Desciprtion</Form.Label>
              
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Product Price" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" placeholder="Product Stock" />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categories</Form.Label>
              <Form.Select>
                <option>Small select</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Cupon</Form.Label>
              <Form.Control type="text" placeholder="Cupon code" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Store Name</Form.Label>
              <Form.Control disabled type="text" value={storename} placeholder="Discount" />
          </Form.Group>

           

          <Button variant="primary" type="submit">
              Upload
          </Button>
      </Form>
    </>
  )
}

export default Uploadproduct