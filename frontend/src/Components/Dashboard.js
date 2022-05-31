import React, { useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import Categories from './layouts/Categories'
import Storepage from './layouts/Storepage'
import Uploadproduct from './layouts/Uploadproduct'

const Dashboard = () => {
  let [sotes,setStores] = useState(false)
  let [categories,setCategories] = useState(false)
  let [productall,setProductall] = useState(false)

  const handlestoreChange = ()=>{
    setStores(true)
    setCategories(false)
    setProductall(false)
  }
  const handlecatChange = ()=>{
    setStores(false)
    setCategories(true)
    setProductall(false)
  }
  const handleproChange = ()=>{
    setStores(false)
    setCategories(false)
    setProductall(true)
  }

  return (
    <section>
      <Row className='mx-0'>
        <Col lg = {4}>
          <ListGroup>
              <ListGroup.Item onClick={handlestoreChange}>Create Store</ListGroup.Item>
              <ListGroup.Item onClick={handlecatChange}>Create category</ListGroup.Item>
              <ListGroup.Item onClick={handleproChange}>Upload products</ListGroup.Item>
              <ListGroup.Item>Payments</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg = {6}>
          {sotes && <Storepage></Storepage>}
          {categories && <Categories></Categories>}
          {productall && <Uploadproduct></Uploadproduct>}
        </Col>
      </Row>
    </section>
  )
}

export default Dashboard