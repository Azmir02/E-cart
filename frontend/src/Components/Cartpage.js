import React,{useContext} from 'react'
import { Container,Row ,Col} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { Store } from './Store'
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { Helmet} from 'react-helmet-async';



const Cartpage = () => {
    let navigate = useNavigate()
    const {state,dispatch} = useContext(Store)
    const {cart:{cartItems}} = state

    const Cartupdate = (item,quantity)=>{
        dispatch({
            type: 'ADD_TO_CART',
            payload: {...item,quantity}
        })
    }

    //for delete cart
    const handleDelete = (item)=>{
        dispatch({
            type: 'DELETE_CART',
            payload: item
        })
    }

    //for checkoutpage redirect 
    let handleCheck = ()=>{
        navigate('/signin?redirect=/shipping')
    }

  return (
    <>
        <section id = "cartpage">
            <Helmet>
                <title>
                    Cartpage
                </title>
            </Helmet>
            <Container>
                <Row>
                    <Col lg = {10}>
                    {cartItems.length == 0 
                            
                        ?
                            <div className="empty-cart d-flex align-items-center justify-content-center">
                                <BsFillExclamationCircleFill></BsFillExclamationCircleFill><h1>There is no cart product</h1>
                            </div>
                            
                        :
                    <div className="cart-page">
                         <Row className='main-cartpage'>
                                        <Col lg = {3}>
                                            <div className="image-det text-center">
                                                <h5>Product Image</h5>
                                            </div>
                                                
                                        </Col>
                                        <Col lg = {3}>
                                            <div className="cart-product-price text-center">
                                            <h5>Price</h5>
                                            </div>
                                        </Col>
                                        <Col lg = {2}>
                                            <div className="cart-qty text-center">
                                            <h5>Quantity</h5>
                                            </div>
                                            
                                        </Col>
                                        <Col lg = {2}>
                                            <div className="cart-subtotal text-center">
                                            <h5>Subtotal</h5>
                                            </div>
                                        </Col>
                                    </Row>
                        {cartItems.map((item)=>(
                            <>
                            <div className='cart-page-details text-center'>
                                <Row className='align-items-center'>
                                    <Col lg = {3}>
                                        <Row className='align-items-center'>
                                            <Col lg = {7}>
                                                <div className="image-det">
                                                    <img src={item.image} alt="" />
                                                </div>    
                                            </Col>
                                            <Col lg = {5}>
                                                <div className="image-det-name">
                                                    <Link to = {`/api/products/${item.slug}`}>{item.name}</Link>
                                                </div>    
                                            </Col>
                                        </Row>
                                    </Col>    
                                    <Col lg = {3}>
                                        <div className="item-pricing">
                                            <p>${item.price}</p>    
                                        </div>    
                                    </Col>    
                                    <Col lg = {2}>
                                        <div className="cart-inc-Or-dec">
                                            <input value={item.quantity}  type="text"/>
                                            <div className="incdec-btn ">
                                                <div className="inner-btns d-flex align-items-center justify-content-between">
                                                    <button onClick={()=>Cartupdate(item,item.quantity - 1)}  disabled = {item.quantity == 1}><i class="fa-solid fa-circle-minus"></i></button>

                                                    <button onClick={()=>Cartupdate(item,item.quantity + 1)} disabled = {item.quantity == item.instock}><i class="fa-solid fa-circle-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>    
                                    </Col>    
                                    <Col lg = {2}>
                                    <div className="subtotal">
                                        <p>${item._id  ? `${item.quantity * item.price}` : item.price}</p>
                                    </div>
                                       
                                    </Col>    
                                    <Col lg = {2}>
                                        <div className="delete-button">
                                            <button onClick={()=>handleDelete(item)} type='buttton'>Delete</button>    
                                        </div>    
                                    </Col>    
                                </Row>    
                            </div>    
                            </>
                            
                        ))}
                    </div>
                            
                    }
                        
                    </Col>
                <Col lg = {2}>
                    <div className="total-product">
                        <h3>Total Product</h3>
                        <h4>({cartItems.reduce((accumulator,current)=> accumulator + current.quantity , 0)})</h4>
                        <div className="subtotal">
                            <p> Total Price: ${cartItems.reduce((accumulator,current)=> accumulator + current.quantity * current.price,0)}</p>
                        </div>
                        <div className="payment-button">
                            <button onClick={handleCheck} type='button'>Chekckout</button>
                        </div>
                    </div>
                </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Cartpage