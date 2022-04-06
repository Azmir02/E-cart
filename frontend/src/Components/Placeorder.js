import React, { useContext,useState } from 'react'
import { Col, Container, Row,Modal,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Checkout from './Checkout'
import { Store } from './Store'

const Placeorder = () => {
    const {state4,state5,dispatch4} = useContext(Store)
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
        }
        else{
           return false
        }
        

    }

     const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



  return (
    <>
        <Container>
            <Row>
                <Col lg = {8} className  = "m-auto">
                    <Checkout step1 = "true" step2 = "true" step3 = "true" step4 = "true"/>
                    <Row className='mt-5'>
                        <Col lg = {6}>
                            <div className="left-info text-center">
                                <h4>User Information</h4>
                                <hr/>
                               <div className="user-payment-info text-start">
                                    <ul>
                                        <li>Name &nbsp;: <span>{state4.shippingInfo.fname}</span> </li>
                                        <li>Address &nbsp;: <span>{state4.shippingInfo.address}</span> </li>
                                        <li>City &nbsp;: <span>{state4.shippingInfo.city}</span> </li>
                                        <li>State &nbsp;: <span>{state4.shippingInfo.state}</span> </li>
                                        <li>Phone &nbsp;: <span>{state4.shippingInfo.phone}</span> </li>
                                    </ul>
                                    <div className="edit-info">
                                        <button onClick={handleShow} type='button'>Edit</button>
                                    </div>
                               </div>
                            </div>
                            <div className="left-payemntinfo text-center mt-5">
                                <h4>Payment Information</h4>
                                <hr/>
                               <div className="user-payment-info text-start">
                                    <ul>
                                        <li>Payment Method &nbsp;: <span>{state5.paymentMethod}</span> </li>
                                    </ul>
                                    <div className="edit-info payement-edit">
                                        <button type='button'> <Link to = "/payment">Edit</Link></button>
                                    </div>
                               </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        <Modal show={show}>
        <div className="form-header mb-5">
                    <h2>Shipping informaton form</h2>
        </div>
        <Modal.Body id='edit-main-form' className='p-5'>
        <form onSubmit={handleSubmit}>
                <div className="main-shippping-form">
                    <div className="form-field text-center mb-4">
                        <input value={fname} onChange={e=>setFname(e.target.value)} type="text" placeholder='First name' />    
                    </div>    
                    <div className="form-field text-center mb-4">
                        <input value={lname} onChange={e=>setLname(e.target.value)} type="text" placeholder='Last name' />    
                    </div>    
                </div>
                <div className="form-field address text-center w-100 mt-4">
                    <input value={address} onChange={e=>setAddress(e.target.value)} type="text" placeholder='Address' />    
                </div>  
                <div className="main-shippping-form d-flex justify-content-between mt-4">
                    <div className="form-field-country text-center">
                        <input value={city} onChange={e=>setCity(e.target.value)} type="text" placeholder='City' />    
                    </div>    
                    <div className="form-field-country text-center">
                        <input value={state} onChange={e=>setState(e.target.value)} type="text" placeholder='State' />    
                    </div>    
                    <div className="form-field-country text-center">
                        <input value={postal} onChange={e=>setPostal(e.target.value)} type="text" placeholder='Postal' />    
                    </div>    
                </div>  
                <div className="main-shippping-form mt-4">
                    <div className="form-field text-center mb-4">
                        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Email' />    
                    </div>    
                    <div className="form-field text-center">
                        <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" placeholder='Phone number' />    
                    </div>    
                </div>
                <div className="shipping-button text-center">
                    <button onClick={handleClose} type='submit'>Continue</button>
                </div>
                </form>
        </Modal.Body>
      </Modal>
      
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
    </>
  )
}

export default Placeorder