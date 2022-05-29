import axios from 'axios'
import React, { useState,useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Store } from '../Store'

const Categories = () => {
  const {state3,dispatch3} = useContext(Store)

  let [catagories,setCategories] = useState("")

  // let handleSubmitsubcat = async (e)=>{
  //   e.preventDefault()
  //   let subcat = await axios.post("/api/products/subcat",{
  //     subcatagories: subcatagories,
  //     // owner: state3.userInfo._id
  //   })
  //   console.log(subcat);
  // }


  let handleSubmitcat = async (e)=>{
    e.preventDefault()
    let data = await axios.post("/api/products/cat",{
      catagories: catagories,
      owner: state3.userInfo._id
    })
    console.log(data);
  }
  


  

  return (
    <>
        <Form className='mt-5'>
          

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Set category</Form.Label>
                <Form.Control onChange={e=>setCategories(e.target.value)} type="text" placeholder="Category name" />
            </Form.Group>
            

            <Button onClick = {handleSubmitcat} variant="primary" type="submit">
                Create
            </Button>
        </Form>
    </>
  )
}

export default Categories