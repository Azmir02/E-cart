import React,{useEffect,useReducer,useContext, useState} from 'react';
import { Container,Card ,Button,Spinner,Row,Col,Dropdown} from 'react-bootstrap';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import { Helmet} from 'react-helmet-async';
import { BsLadder } from "react-icons/bs";
import Ratings from './Ratings';
import { Store } from './Store';


function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {...state,isLoading:true};
        case 'FETCH_SUCCESS':
          return {...state,isLoading:false, product: action.payload};
        case 'FETCH_ERROR':
          return {...state,isLoading:false, error: action.payload};
      default:
        return state
    }
  }
  

const Compare = () => {

    const {state,dispatch: patchContxt} = useContext(Store)
    const {cart:{cartItems}} = state
    const [compareproduct,setCompareproduct] = useState("")
    const [compareproduct2,setCompareproduct2] = useState("")



  const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
    isLoading: false,
    product: [],
    error: ''
  });

  useEffect(async ()=>{
    dispatch({type:'FETCH_REQUEST'})
    try{
      let productinfo = await axios.get('/products')
      dispatch({type:'FETCH_SUCCESS', payload:productinfo.data})
    }catch(err){
      dispatch({type:'FETCH_ERROR', payload:err.message})
    }
  },[])


  const handleCompare = async (params)=>{
    let productinfo = await axios.get(`/products/${params}`)
    setCompareproduct(productinfo.data)
  }
  //another side compare
  const handleCompare2 = async (params)=>{
    let productinfo = await axios.get(`/products/${params}`)
    setCompareproduct2(productinfo.data)
  }

  let handleCart = async (product)=>{
    const existingItem = state.cart.cartItems.find((item)=> item._id == product._id)
    const quantity  = existingItem ? existingItem.quantity + 1 : 1

    const {data} = await axios.get(`/${product._id}`)

    if(data.instock < quantity){
      alert(`${product.name} Is Out Of Stock`)
      return
    }
    patchContxt({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        quantity
      }
  })
  }
  return (
    <>
        <Container className='main-compare'>
            <Row className='mt-5'>
                <Col lg={4}>
                    <div className="left-compare">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                            Choose Products
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                        {product.map((item)=>(
                                <>
                                <Dropdown.Item href="#" active onClick={()=>handleCompare(item.slug)}>
                                    <div className="menu-product d-flex align-items-center justify-content-between">
                                            <div className="product-images">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="product-name">
                                                <span>{item.name}</span>
                                            </div>
                                    </div>
                                </Dropdown.Item>
                                </>
                        ))}
                        
                        </Dropdown.Menu>
                    </Dropdown>
                    {compareproduct ?
                        <>
                          <div className="compare-product-details mt-5">
                              <img src={compareproduct.image} alt="" />
                              <p>{compareproduct.desciprtion}</p>
                              <h4>{compareproduct.name}</h4>
                              <div className="left-rating">
                                <Ratings rating = {compareproduct.rating} ratingnumber = {compareproduct.numberofrating}/>
                              </div>
                              <Button onClick={()=>handleCart(compareproduct)} variant="primary">{compareproduct.button}</Button>
                              
                          </div>
                          
                          
                        </>
                        :
                       <div className="not-choosen">
                          <h4>Please  Choose Any Kind Of Product</h4>
                       </div> 
                    }
                    </div>
                </Col>
                <Col lg = {4} className = "ms-auto">
                <div className="left-compare">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                            Choose Products
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                        {product.map((item)=>(
                                <>
                                <Dropdown.Item href="#" active onClick={()=>handleCompare2(item.slug)}>
                                    <div className="menu-product d-flex align-items-center justify-content-between">
                                            <div className="product-images">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className="product-name">
                                                <span>{item.name}</span>
                                            </div>
                                    </div>
                                </Dropdown.Item>
                                </>
                        ))}
                        
                        </Dropdown.Menu>
                    </Dropdown>
                    {compareproduct2 ?
                        <>
                          <div className="compare-product-details mt-5">
                              <img src={compareproduct2.image} alt="" />
                              <p>{compareproduct2.desciprtion}</p>
                              <h4>{compareproduct2.name}</h4>
                              <div className="left-rating">
                                <Ratings rating = {compareproduct2.rating} ratingnumber = {compareproduct2.numberofrating}/>
                              </div>
                              <Button onClick={()=>handleCart(compareproduct2)} variant="primary">{compareproduct2.button}</Button>
                              
                          </div>
                          
                          
                        </>
                        :
                       <div className="not-choosen">
                          <h4>Please  Choose Any Kind Of Product</h4>
                       </div> 
                    }
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Compare