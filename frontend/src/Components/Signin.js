import React, { useState } from 'react'
import { Col, Container, Row,Form } from 'react-bootstrap'
import { Link,useLocation } from 'react-router-dom'
import paymentlogo from '../payment.png'
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";

const Signin = () => {

  const [showPassword,setPassword] = useState('password')

  let showPass = ()=>{
    if(showPassword == 'password'){
      setPassword('text')
    }
    else{
      setPassword('password')
    }
  }


  let {search} = useLocation()
  let redirectUrl = new URLSearchParams(search).get('redirect')
  let redirect = redirectUrl ? redirectUrl : "/"
  return (
    <>
        <section id='signin-page'>
            <Container>
                <Row>
                    <Col lg={4} className = "m-auto">
                        <div className="item-signgin d-flex align-items-center">
                          <div className="signin-form">
                            <div className="form-header mb-5">
                              <img src={paymentlogo} alt="payment" />
                            </div>
                          <div className="form-field mb-3">
                            <Form.Label htmlFor="inputPassword5">Email*</Form.Label>
                            <Form.Control type="email"/>
                          </div>
                          <div className="form-field password">
                            <Form.Label htmlFor="inputPassword5">Password*</Form.Label>
                            <Form.Control type= {showPassword}/>
                            {showPassword == "text" ? <BsEyeFill className='eye' onClick={showPass}></BsEyeFill>  : <BsEyeSlashFill onClick={showPass} className='eye'></BsEyeSlashFill>}
                          </div>
                          <div className="button-field mt-5 text-center">
                            <button type='submit'>Sign in</button>
                          </div>
                            <div className="sign-up text-center mt-4">
                              <p>Don't have an account? please <Link to= {`/signup?redirect=${redirect}`}>Sign up</Link> </p>
                            </div>
                          </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Signin