import React, { useContext,useEffect,useState ,useReducer} from 'react'
import { Col, Container, Row,Modal,Button,ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Checkout from './Checkout'
import { Store } from './Store'
import axios from 'axios'

function reducer(state, action) {
    switch (action.type) {
      case 'CREATE_REQUEST':
        return {
            ...state,
            isLoading: true
        };
      case 'CREATE_SUCCESS':
        return {
            ...state,
            isLoading: false
        };
      
        case 'CREATE_FAIL':
            return {
                ...state,
                isLoading: false
            };
      
      default:
        return state
    }
  }

const Placeorder = () => {
    const [{isLoading}, dispatch] = useReducer(reducer, {
        isLoading: false,
        error: ''
    });


    const {state,state3,state4,state5,dispatch4,dispatch: patchContxt} = useContext(Store)
    const {shippingInfo} = state4;
    const{userInfo} = state3;
    const navigate = useNavigate()

    

    //information states
    let [fname,setFname] = useState( shippingInfo.fname || '')
    let [lname,setLname] = useState(shippingInfo.lname || '')
    let [address,setAddress] = useState(shippingInfo.address || '')
    let [city,setCity] = useState(shippingInfo.city || '')
    let [states,setStates] = useState( shippingInfo.states || '')
    let [postal,setPostal] = useState(shippingInfo.postal || '')
    let [email,setEmail] = useState( shippingInfo.email || '')
    let [phone,setPhone] = useState(shippingInfo.phone || '')
    let [totalprice,setTotalprice] = useState("")
    let [tax,setTax] = useState("")
    let [delivery,setDelivery] = useState("")



    //form validation
    let formValid = ({fname,lname,address,city,states,postal,email,phone})=>{
        if(!fname|| !lname|| !address|| !city|| !states|| !postal|| !email|| !phone){
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
        else if(city === states){
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
        if(formValid({fname,lname,address,city,states,postal,email,phone})){
            dispatch4({type: 'SHIPPING', payload: {fname,lname,address,city,states,postal,email,phone}})
            localStorage.setItem('shippingInfo',JSON.stringify({fname,lname,address,city,states,postal,email,phone}))
        }
        else{
           return false
        }
        

    }

     const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //total price
    useEffect(()=>{
        let totalprice = state.cart.cartItems.reduce((accumulator,current)=> accumulator + current.quantity * current.price.toFixed(),0)
        setTotalprice(totalprice)

        let delivery = totalprice > 200 ? 0 : 95
        setDelivery(delivery)
        let tax = totalprice > 500 ? (totalprice*5)/100 : 0
        setTax(tax)

    },[state.cart.cartItems])



    //order

    const handleOrder = async ()=>{
        try{
            const {data} = await axios.post('/api/orders',{
                orderItems: state.cart.cartItems,
                shippingaddress: state4.shippingInfo,
                paymentmethod: state5.paymentMethod,
                productprice: totalprice,
                deliverycharge: delivery,
                tax: tax
            },
            {
                headers: {
                    authorized:`Bearer ${userInfo.token}`
                }
            }
            )
            patchContxt({type: 'CLEARE_CART'})
            dispatch({type: 'CREATE_SUCCESS'})
            localStorage.removeItem('cartitems')
            navigate(`/orders/${data.order._id}`)
            
        }
        catch(err){
            dispatch({type:'CREATE_FAIL'})
            console.log(err);
        }
    }

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
                                    <ul className='p-0'>
                                        <li>Payment Method &nbsp;: <span>{state5.paymentMethod}</span> </li>
                                    </ul>
                                    <div className="edit-info payement-edit">
                                        <button type='button'> <Link to = "/payment">Edit</Link></button>
                                    </div>
                               </div>
                            </div>
                            <div className="order-items mt-5">
                                <h4>Order Items</h4>
                                <hr/>
                               <div className="order-info">
                                   <div className="order-list">
                                       <b>Total Orders: {state.cart.cartItems.length}</b>
                                       <ul className='p-0 mt-5'>
                                       
                                           {state.cart.cartItems.map((item)=>(

                                           <li className='mb-5'>
                                               <img style={{width: "60px"}} src={item.image}/>
                                               <span className='ms-3'>{item.name}</span>
                                               <span className='ms-5'>Quantity: {item.quantity}</span>
                                               <hr/>
                                            </li>
                                           ))}
                                       </ul>
                                   </div>
                                    <div className="edit-info payement-edit">
                                        <button type='button'> <Link to = "/api/products">Edit</Link></button>
                                    </div>
                               </div>
                            </div>
                        </Col>
                        <Col lg = {6}>
                            <div className="payment-checkout">
                            <ListGroup>
                                <ListGroup.Item>Total Price : ${totalprice}</ListGroup.Item>
                                <ListGroup.Item>Delivery Charge : ${delivery}</ListGroup.Item>
                                <ListGroup.Item>Tax : ${tax}</ListGroup.Item>
                                <ListGroup.Item>Amount : ${totalprice+tax+delivery}</ListGroup.Item>
                            </ListGroup>
                            <div className="edit-info payement-edit mx-3 mb-3" >
                                <button onClick={handleOrder} type='button'> Procced</button>
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
                        <input value={states} onChange={e=>setStates(e.target.value)} type="text" placeholder='State' />    
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