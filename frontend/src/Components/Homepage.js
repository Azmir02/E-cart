import React,{useEffect, useState} from 'react';
import { Helmet} from 'react-helmet-async';
import axios from 'axios';
import {Modal,Button,Row,Col,Container} from 'react-bootstrap'
import Slider from "react-slick";
import { BsArrowLeftShort,BsArrowRightShort } from "react-icons/bs";

const Homepage = () => {
  const [show, setShow] = useState(true);
  const [popupimage, setPopupimage] = useState("");
  const [banner, setBanner] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect( async()=>{
    let discount = await axios.get('/discount')
    setPopupimage(discount.data)
  },[])

  useEffect( async()=>{
    let banner = await axios.get('/banner')
    setBanner(banner.data)
  },[])



  //slick-slider
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    arrows: false,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };



  return (
    <>
    <Helmet>
      <title>
        E-CART
      </title>
    </Helmet>

   
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="popup-text">
                    <h4>{popupimage.title}</h4> 
                    <h3>{popupimage.heading}</h3> 
                    <p>{popupimage.para}</p>
                    <div className="popup-btn">
                      <Button onClick={handleClose}>Shop Now</Button>  
                    </div>
              </div>  

          <img src={popupimage.image} alt="" />

        </Modal.Body>
      </Modal>

    <section id = "banner">
      
        <Container>
          <Row className='mt-3'>
            <Col lg = {12}>
                <Row className='mx-0'>
                  <Col lg = {8} className = "ms-auto px-0">
                    <Slider {...settings}>
                          {banner.map((item)=>(
                              <div className='banner-images'>
                                <img src={item.image} alt="banner" />
                                <div className="ban-text">
                                  <h5>
                                    {item.title}</h5>
                                  <h2>{item.subtitle}</h2>
                                  <p>
                                    {item.para}</p>  
                                </div>
                              </div>
                          ))}
                      </Slider> 
                    </Col>
                </Row>
            </Col>
          </Row>
        </Container>
    </section>
    </>
  )
};

export default Homepage;
