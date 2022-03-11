import React,{useEffect, useState} from 'react';
import { Helmet} from 'react-helmet-async';
import axios from 'axios';
import {Modal,Button,Row,Col} from 'react-bootstrap'
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
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
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
        
        <Row className='mx-0'>
          <Col lg = {12} className = "px-0">
          <Slider {...settings}>
            {banner.map((item)=>(
                <>
                <img src={item.image} alt="" />
                <div className="overlay"></div>  
                </>
            ))}
            
          </Slider>
          </Col>
        </Row>
        <div className="overlay"></div>
    </section>
    </>
  )
};

export default Homepage;
