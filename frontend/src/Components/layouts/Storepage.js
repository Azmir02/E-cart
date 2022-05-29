import axios from 'axios'
import React, { useState,useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Store } from '../Store'

const Storepage = () => {
    const {state3,dispatch3} = useContext(Store)
    let [storename,setStorename] = useState("")


    const handleCreate = async (e)=>{
        e.preventDefault()
        let data = await axios.post('/api/products/store',{
            storename: storename,
            owner: state3.userInfo._id

        })
        console.log(data);

    }
  return (
    <>
    <Form className='mt-5'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Create Store</Form.Label>
            <Form.Control onChange={e=>setStorename(e.target.value)} type="text" placeholder="Store name" />
        </Form.Group>

        <Button onClick={handleCreate} variant="primary" type="submit">
            Create
        </Button>
    </Form>


    </>
  )
}

export default Storepage