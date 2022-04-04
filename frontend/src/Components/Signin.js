import React, { useContext, useState } from 'react'
import { Col, Container, Row,Form } from 'react-bootstrap'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import paymentlogo from '../payment.png'
import { ToastContainer, toast } from 'react-toastify';
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import axios from 'axios';
import { Store } from './Store';

const Signin = () => {

  

  const [showpass,setPass] = useState('password')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  let showPass = ()=>{
    if(showpass == 'password'){
      setPass('text')
    }
    else{
      setPass('password')
    }
  }


  let {search} = useLocation()
  let redirectUrl = new URLSearchParams(search).get('redirect')
  let redirect = redirectUrl ? redirectUrl : "/"



  //contextapi connection
  const {state3,dispatch3} = useContext(Store)
  const navigate = useNavigate()


  //userSignin

  const handleSignin = async (e)=>{
    e.preventDefault()
    try{
        const {data} = await axios.post("/api/userauth/userinfo",{
          email,
          password
        })
        dispatch3({type: "USER_LOGGIN",payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
        navigate(redirect || "/")
    }
    catch(err){
      toast.error('Invalid email or password', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  return (
    <>
        <section id='signin-page'>
            <Container>
                <Row>
                    <Col lg={4} className = "m-auto">
                        <div className="item-signgin d-flex align-items-center">
                          <div className="signin-form">
                            <div className="form-header-image mb-5">
                              <img src={paymentlogo} alt="payment" />
                            </div>
                              <div className="form-field mb-3">
                                <Form.Label htmlFor="inputPassword5">Email*</Form.Label>
                                <Form.Control onChange = {e => setEmail(e.target.value)} type="email"/>
                              </div>
                              <div className="form-field password">
                                <Form.Label htmlFor="inputPassword5">Password*</Form.Label>
                                <Form.Control onChange = {e => setPassword(e.target.value)} type= {showpass}/>
                                {showpass == "text" ? <BsEyeFill className='eye' onClick={showPass}></BsEyeFill>  : <BsEyeSlashFill onClick={showPass} className='eye'></BsEyeSlashFill>}
                              </div>
                              <div className="button-field mt-5 text-center">
                                <button onClick={handleSignin} type='submit'>Sign in</button>
                              </div>
                            <div className="sign-up text-center mt-4">
                              <p>Don't have an account? please <Link to= {`/signup?redirect=${redirect}`}>Sign up</Link> </p>
                            </div>
                          </div>

                        </div>
                    </Col>
                </Row>
                <ToastContainer
                  limit={1}
                  position="bottom-center"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  />
            </Container>
        </section>
    </>
  )
}

export default Signin