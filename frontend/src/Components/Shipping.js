import React, { useContext, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Checkout from './Checkout'
import { Store } from './Store'

const Shipping = () => {
    //context api connection
    const {state4,dispatch4} = useContext(Store)
    const {shippingInfo} = state4 

    //information state
    let [fname,setFname] = useState( shippingInfo.fname || '')
    let [lname,setLname] = useState(shippingInfo.lname || '')
    let [address,setAddress] = useState(shippingInfo.address || '')
    let [city,setCity] = useState(shippingInfo.city || '')
    let [state,setState] = useState( shippingInfo.state || '')
    let [postal,setPostal] = useState(shippingInfo.postal || '')
    let [email,setEmail] = useState( shippingInfo.email || '')
    let [phone,setPhone] = useState(shippingInfo.phone || '')




    //for navigate route
    let navigate = useNavigate()

    //form validation
    let formValid = ({fname,lname,address,city,state,postal,email,phone})=>{
        if(!fname|| !lname|| !address|| !city|| !state|| !postal|| !email|| !phone){
            toast.error("Please full fill your information", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            
        }
        else if(city === state){
            toast.error(`City and State must be different`, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            return true
        }
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
        if(formValid({fname,lname,address,city,state,postal,email,phone})){
            dispatch4({type: 'SHIPPING', payload: {fname,lname,address,city,state,postal,email,phone}})
            localStorage.setItem('shippingInfo',JSON.stringify({fname,lname,address,city,state,postal,email,phone}))
            navigate('/payment')
        }
        else{
           return false
        }
        

    }

  return (
    <>
        <Helmet>
            <title>Shipping</title>
        </Helmet>
        <Container>
            <Row>
                <Col lg = {8} className = "m-auto">
                   <Checkout step1 = 'true' step2 = 'true'/>
                </Col>
            </Row>
            <Row>
                <Col lg = {5} className = "mx-auto mt-5">
                    <div className="shipping text-center">
                        <form onSubmit={handleSubmit}>

                            <div className="form-header mb-5">
                                <h2>Shipping informaton form</h2>
                            </div>
                            <div className="main-shippping-form d-flex justify-content-between">
                                <div className="form-field">
                                    <input value={fname} onChange={e=>setFname(e.target.value)} type="text" placeholder='First name' />    
                                </div>    
                                <div className="form-field">
                                    <input value={lname} onChange={e=>setLname(e.target.value)} type="text" placeholder='Last name' />    
                                </div>    
                            </div>
                            <div className="form-field address w-100 mt-4">
                                <input value={address} onChange={e=>setAddress(e.target.value)} type="text" placeholder='Address' />    
                            </div>  
                            <div className="main-shippping-form d-flex justify-content-between mt-4">
                                <div className="form-field-country">
                                    <input value={city} onChange={e=>setCity(e.target.value)} type="text" placeholder='City' />    
                                </div>    
                                <div className="form-field-country">
                                    <input value={state} onChange={e=>setState(e.target.value)} type="text" placeholder='State' />    
                                </div>    
                                <div className="form-field-country">
                                    <input value={postal} onChange={e=>setPostal(e.target.value)} type="text" placeholder='Postal' />    
                                </div>    
                            </div>  
                            <div className="main-shippping-form d-flex justify-content-between mt-4">
                                <div className="form-field">
                                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Email' />    
                                </div>    
                                <div className="form-field">
                                    <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" placeholder='Phone number' />    
                                </div>    
                            </div>
                            <div className="shipping-button text-start">
                                <button type='submit'>Continue</button>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
            />
        </Container>
    </>
  )
}

export default Shipping