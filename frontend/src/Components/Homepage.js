import React,{useEffect, useState} from 'react';
import { Helmet} from 'react-helmet-async';
import axios from 'axios';
import {Modal,Button,Row,Col,Container} from 'react-bootstrap'
import Slider from "react-slick";
import { BsTruck,BsHeadphones ,BsCreditCard2Back,BsCashStack} from "react-icons/bs";
import Latestslider from './Homepagecomponents/Latestslider';

const Homepage = () => {
  const [show, setShow] = useState(true);
  const [popupimage, setPopupimage] = useState("");
  const [banner, setBanner] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect( async()=>{
    let discount = await axios.get('/api/popup/discount')
    let datapop = discount.data.find((item)=> item._id )
    setPopupimage(datapop)
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
                  <Col lg = {9} className = "ms-auto px-0">
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
          <img src ="/uploads\avatar-1653834799186.png" alt="abal"/>
        </Container>
    </section>

    <section id='details'>
        <Container>
          <Row>
            <Col lg = {12}>
                <div className="inner-details">
                  <Row>
                    <Col lg = {3}>
                      <div className="details-part d-flex">
                            <div className="left-details-image">
                              <BsTruck></BsTruck>  
                            </div>
                            <div className="right-details-text">
                                <h4>Free Shipping</h4>  
                                <p>Free shipping on all BD order</p>
                            </div>
                      </div>
                    </Col>
                    <Col lg = {3}>
                      <div className="details-part d-flex">
                            <div className="left-details-image">
                              <BsHeadphones></BsHeadphones>  
                            </div>
                            <div className="right-details-text">
                                <h4>24/7 Support</h4>  
                                <p>Contact us 24 hours a day</p>
                            </div>
                      </div>
                    </Col>
                    <Col lg = {3}>
                      <div className="details-part d-flex">
                            <div className="left-details-image">
                              <BsCreditCard2Back></BsCreditCard2Back>  
                            </div>
                            <div className="right-details-text">
                                <h4>100% Money Back</h4>  
                                <p>You have 30 days to Return</p>
                            </div>
                      </div>
                    </Col>
                    <Col lg = {3}>
                      <div className="details-part d-flex">
                            <div className="left-details-image">
                              <BsCashStack></BsCashStack>  
                            </div>
                            <div className="right-details-text">
                                <h4>90 Days Return</h4>  
                                <p>If goods have problems</p>
                            </div>
                      </div>
                    </Col>
                  </Row>
                </div>
            </Col>
          </Row>
        </Container>
    </section>

    <Latestslider></Latestslider>
    </>
  )
};

export default Homepage;
