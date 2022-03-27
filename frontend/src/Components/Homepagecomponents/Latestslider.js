import React, { useEffect, useState,useReducer } from 'react'
import Slider from "react-slick";
import { Col, Container, Row } from 'react-bootstrap'
import Ratings from '../Ratings';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Bestselling from './Bestselling';


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


const Latestslider = () => {



const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
    isLoading: false,
    product: [],
    error: ''
  });

  useEffect(()=>{
    let getslider = async ()=>{
        dispatch({type:'FETCH_REQUEST'})
    try{
      let productinfo = await axios.get('/api/pslide')
      dispatch({type:'FETCH_SUCCESS', payload:productinfo.data})
    }catch(err){
      dispatch({type:'FETCH_ERROR', payload:err.message})
    }
    }
    getslider()
    
  },[])

//slick-slider
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true
  };


  return (
    <>

    <section id = "latest-slider">
        <Container>
            <Row>
                <Col lg = {3}>
                    <div className="latest-header">
                        <h5>Latest Products</h5>
                    </div>
                    <div className="product-inner">
                        <Slider {...settings}>
                            {product.map((item)=>(
                                <div className="inner-latest d-flex justify-content-between align-items-center">
                                    <div className="latest-image">
                                        <img src={item.image} alt="latest" />    
                                    </div>    
                                    <div className="latest-content">
                                        <Link to={`/${item.slug}`}><h6>{item.name}</h6>  </Link>  
                                        <Ratings rating = {item.rating} ratingnumber = {item.numberofrating}/>
                                    </div>    
                                </div>
                            ))}
                            
                        </Slider> 
                    </div>
                </Col>
                <Col lg = {9}>
                    <div className="best-selling-part">
                          <div className="best-sell-header">
                            <h5>Best Selling</h5>
                          </div> 
                    </div>
                    <Bestselling></Bestselling>
                </Col>
            </Row>
        </Container>    
    </section>
    </>
  )
}

export default Latestslider