import React, { useContext, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom'
import Checkout from './Checkout'
import paypal from '../../src/paypal.png'
import stripe from '../../src/stripe.png'
import ssl from '../../src/ssl.png'
import { Store } from './Store'

const Payment = () => {
    const {state5,dispatch5} = useContext(Store)
    let navigate = useNavigate()
    let [paymentmethod,setPaymentmethod] = useState(state5.paymentMethod ? state5.paymentMethod : "")




    let handleSubmit = (e)=>{
        e.preventDefault()
        dispatch5({type: "PAYMENT",payload: paymentmethod})
        localStorage.setItem('paymentMethod',JSON.stringify(paymentmethod))
        navigate("/placeorder")
    }
  return (
    <>
    <Helmet>
        <title>
            Payment
        </title>
    </Helmet>
        <Container>
            <Row>
                <Col lg = {6} className = "m-auto">
                    <Checkout step1 = "true" step2 = "true" step3 = "true"/>
                    <div className="main-payment mt-5 mb-5">
                        <h5>*Choose your payment method</h5>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={4}>
                                <div className="payment-method">
                                    <img style={{width: "70%"}} src= {paypal} alt="" />
                                    <Form.Check
                                        inline
                                        label="Paypal"
                                        value="paypal"
                                        type= "radio"
                                        id= "paypal"
                                        checked = {paymentmethod == "paypal"}
                                        onChange={e=>setPaymentmethod(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="payment-method">
                                <img style={{width: "49%"}} src= {stripe} alt="" />
                                    <Form.Check
                                        inline
                                        label="Stripe"
                                        value="stripe"
                                        type= "radio"
                                        id= "stripe"
                                        checked = {paymentmethod == "stripe"}
                                        onChange={e=>setPaymentmethod(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="payment-method">
                                <img style={{width: "100%"}} src= {ssl} alt="" />
                                    <Form.Check
                                        inline
                                        label="Sslcommerze"
                                        value= "sslcommerze"
                                        type= "radio"
                                        id= "sslcommerze"
                                        checked = {paymentmethod == "sslcommerze"}
                                        onChange={e=>setPaymentmethod(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="paymentmethod-button">
                            <button type='submit'>Procced</button>
                        </div>
                    </Form>

                    
                    <div className="back-navigation">
                       <BsArrowLeftShort></BsArrowLeftShort> <Link to = "/shipping">Back to shipping</Link>    
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Payment