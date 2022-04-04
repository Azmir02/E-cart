import React,{useContext} from 'react'
import { Container,Row ,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Store } from './Store'
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { Helmet} from 'react-helmet-async';



const Wishlist = () => {
    const {state2,dispatch2} = useContext(Store)
    const {Wishlist:{WishlistItems}} = state2

    const Wishlistupdate = (item,quantity)=>{
        dispatch2({
            type: 'WISHLIST_TO_CART',
            payload: {...item,quantity}
        })
    }

    //for delete cart
    const handleDelete = (item)=>{
        dispatch2({
            type: 'DELETE_WISHLIST_CART',
            payload: item
        })
    }

  return (
    <>
        <section id = "cartpage">
            <Helmet>
                <title>
                    Wishlistpage
                </title>
            </Helmet>
            <Container>
                <Row>
                    <Col lg = {10}>
                    {WishlistItems.length == 0 
                            
                        ?
                            <div className="empty-cart d-flex align-items-center justify-content-center">
                                <BsFillExclamationCircleFill></BsFillExclamationCircleFill><h1>There is no wishlist product</h1>
                            </div>
                            
                        :
                    <div className="cart-page">
                         <Row className='main-cartpage'>
                                        <Col lg = {4}>
                                            <div className="image-det text-center">
                                                <h5>Product Image</h5>
                                            </div>
                                                
                                        </Col>
                                        <Col lg = {4}>
                                            <div className="cart-product-price text-center">
                                            <h5>Price</h5>
                                            </div>
                                        </Col>
                                        <Col lg = {4}>
                                            <div className="cart-subtotal text-center">
                                            <h5>Added Wishlist</h5>
                                            </div>
                                        </Col>
                                    </Row>
                        {WishlistItems.map((item)=>(
                            <>
                            <div className='cart-page-details text-center'>
                                <Row className='align-items-center'>
                                    <Col lg = {4}>
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
                                    <Col lg = {4}>
                                        <div className="item-pricing">
                                            <p>${item.price}</p>    
                                        </div>    
                                    </Col>    
                                    
                                    <Col lg = {4}>
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
                    
                </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Wishlist