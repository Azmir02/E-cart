import axios from 'axios'
import React,{useEffect, useReducer,useContext} from 'react'
import { Col, Container, Row ,Card,ListGroup,ListGroupItem,Spinner,Alert} from 'react-bootstrap'
import {PayPalButtons,usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {  toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from './Store'



function reducer(state, action) {
    switch (action.type) {
      case 'DATA_REQUEST':
          return{
              ...state,
              isLoading: true,
              error: ''
          }
        case 'DATA_SUCCESS':
          return{
              ...state,
              isLoading: false,
              order: action.payload,
              error: ''
          }
        case 'DATA_FAIL':
            return{
                ...state,
                isLoading: false,
                error: action.payload
            }
        case 'PAYPAL_REQUEST':
            return{
                ...state,
                isLoadingpaypal: true
            }
        case 'PAYPAL_SUCCESS':
            return{
                ...state,
                isLoadingpaypal: false,
                successpaypal: true
            }
        case 'PAYPAL_FAIL':
            return{
                ...state,
                isLoadingpaypal: false,
                errorpaypal: action.payload
            }
        case 'PAYPAL_RESET':
            return{
                ...state,
                isLoadingpaypal: false,
                successpaypal: false
            }
      default:
        return state
    }
}

const Order = () => {

    const [{isLoading,order,error,isLoadingpaypal,successpaypal,errorpaypal}, dispatch] = useReducer(reducer, {
        isLoading: false,
        order: {},
        error: "",
        isLoadingpaypal: false,
        successpaypal: false,
        errorpaypal: ''
    });

    const [{isPending }, paypalDispatch] = usePayPalScriptReducer()
    console.log(order,"order bal hala");

    const {state,state3,state4,state5,dispatch4,dispatch: patchContxt} = useContext(Store)
    const navigate = useNavigate()
    const{userInfo} = state3;

    const params = useParams()
    const {id: OrderId} = params



    //for paypal
    const createOrder = (data,actions)=>{
        return actions.order
        .create({
            purchase_units:[
                {
                    amount:{
                        value: order.productprice
                    }
                }
            ]
        }).then((orderID)=>{
            return orderID;
        })
    }

    const onApprove = (data, actions)=>{
        return actions.order.capture().then(async function(details) {
            try{
                dispatch({type: 'PAYPAL_REQUEST'})
                const {data} = await axios.put(`/api/orders/${order._id}/pay`,details,{
                    headers: `Bearer ${userInfo.token}`
                })
                dispatch({
                    type: 'PAYPAL_SUCCESS',
                    payload: data
                })
            }
            catch(err){
                dispatch({
                    type: 'PAYPAL_FAIL',
                    payload: err.message
                })
            }
        })
    }

    const onError = (data, actions) => {
        toast.error("An Error occured with your payment ");
      };
    console.log(order._id);
    useEffect(()=>{
        if(!order._id || successpaypal || (order._id && order._id !== OrderId)){
            let showorderdata = async ()=>{
                try{
                    dispatch({type: 'DATA_REQUEST'})
                    const {data} = await axios.get(`/api/orders/${OrderId}`,{
                        headers: {
                            authorized:`Bearer ${userInfo.token}`
                        }
                    })

                    dispatch({type: 'DATA_SUCCESS', payload: data})
                    
                }catch{
                    dispatch({type: 'DATA_FAIL'})
                }
            }
            showorderdata()
            if(successpaypal){
                dispatch({type: 'PAYPAL_RESET'})
            }
        }
        else{
            const loadPaypal = async ()=>{
                const {data: client_id} = await axios.get("/api/key/paypal",{
                    headers: {
                        authorized:`Bearer ${userInfo.token}`
                    }
                })
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        'client_id': client_id,
                        currency: "USD",
                    },
                });
                paypalDispatch({
                    type: "setLoadingStatus",
                    value: 'pending'
                });
            }

            loadPaypal()
        }
        
    },[OrderId,order,userInfo,navigate,successpaypal,paypalDispatch])

  return (
    <>
        {isLoading
        ?
        <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
        </Spinner>
        :
        error
        ?
        <Alert variant="danger">
            <p>{error}</p>
        </Alert>
        :
        <Container>
            <Row>
                <Col lg = {8}>
                <Card className='mt-5 order-summery' style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title>Order : {OrderId}</Card.Title>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Name: {order.shippingaddress && order.shippingaddress.fname}</ListGroupItem>
                        <ListGroupItem>address: {order.shippingaddress && order.shippingaddress.address}</ListGroupItem>
                        <ListGroupItem>city: {order.shippingaddress && order.shippingaddress.city}</ListGroupItem>
                    </ListGroup>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Paymentmethod: {order.paymentmethod && order.paymentmethod}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                       <h3>order items</h3>
                       {order.orderItems && order.orderItems.map((item)=>(
                           <div className="main-item d-flex justify-content-between align-items-center">
                                <div className="image">
                                    <img style={{width: "80px"}} src= {item.image}/>
                                </div>
                                <div className="quantity">
                                    <h5>{item.quantity}</h5>
                                </div>
                                <div className="price">
                                    <h5>{item.price}</h5>
                                </div>
                           </div>

                       ))}
                    </Card.Body>
                </Card>
                </Col>
                <Col lg = {4}>
                <Card className='mt-5'>
                    <Card.Body>
                        <Card.Title>Order summery</Card.Title>
                        <Card.Text>
                            <ul>
                                <li>SubTotal: $ {order.productprice}</li>
                                <li>Delivery: $ {order.deliverycharge}</li>
                                <li>Tax: $ {order.tax}</li>
                            </ul>
                            <hr/>
                            Total: ${order.productprice+order.deliverycharge+order.tax}
                        </Card.Text>
                    </Card.Body>
                    </Card>

                        {order.isPaid
                            &&
                            isPending
                                ?
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden"></span>
                                </Spinner>
                                :
                                <PayPalButtons createOrder= {createOrder} onApprove = {onApprove } onError = {onError }></PayPalButtons>

                         }
                         {isLoadingpaypal &&  
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden"></span>
                            </Spinner>
                            }
                </Col>
            </Row>
        </Container>

        }
        
    </>
  )
}

export default Order