import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Checkout = (props) => {
  return (
    <>
    
        <Row className='checkout-part'>
            <Col lg = {8} className = "m-auto mt-3">
                <div className="main-chekout d-flex justify-content-between">
                    <div className={`signin ${props.step1 ? 'active' : ""}`}>
                        <p>Signin</p>
                    </div>    
                    <div className={`shipping-inner ${props.step2 ? 'active' : ""}`}>
                        <p>Shipping</p>    
                    </div>    
                    <div className={`payment ${props.step3 ? 'active' : ""}`}>
                        <p>Payment</p>    
                    </div>    
                    <div className={`finish ${props.step4 ? 'active' : ""}`}>
                        <p>Checkout</p>    
                    </div>    
                </div>
            </Col>
        </Row>
    </>
  )
}

export default Checkout