import React,{useContext, useEffect,useReducer,useState} from 'react';
import axios from 'axios'
import { useParams,useNavigate,Link } from 'react-router-dom';
import Ratings from './Ratings';
import { BsBag,BsHeart } from "react-icons/bs";
import ImageZoom from "react-image-zooom";
import Zoom from 'react-img-zoom'
import ReactImageMagnify from "react-image-magnify";
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet} from 'react-helmet-async';
import { Container,Row ,Col} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from './Store';
import Errorpage from './Errorpage';
import Slider from "react-slick";

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


const Productdetails = () => {
  const {state, dispatch:patchContxt,state2,dispatch2} = useContext(Store)
    let navigate = useNavigate();
    let params = useParams();
    let [relatedproducts,setRelatedproducts] = useState([])
    let [cuponcode,setCuponcode] = useState('')
    let [discountrate,setDiscountrate] = useState('')
    let [cuponerror,setCuponerror] = useState('')

    const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
      isLoading: false,
      product: {},
      error: ''
    });

    useEffect(()=>{
      let detailsproducts = async()=>{
        dispatch({type:'FETCH_REQUEST'})
      try{
        let productinfo = await axios.get(`/api/products/${params.slug}`)
        console.log(productinfo);
        dispatch({type:'FETCH_SUCCESS', payload:productinfo.data})

        //related product parts
        let allproducts = await axios.get(`/api/products`)
        let filterproducts = allproducts.data.filter((item) => item.category == productinfo.data.category && item.name !== productinfo.data.name)
        setRelatedproducts(filterproducts);
        
      }catch(err){
        dispatch({type:'FETCH_ERROR', payload:err.message})
      }
      }
      detailsproducts()
    },[params.slug])


    const handleCart = async ()=>{
      const existingItem = state.cart.cartItems.find((item)=> item._id == product._id)
      const quantity  = existingItem ? existingItem.quantity + 1 : 1

      const {data} = await axios.get(`/api/${product._id}`)

      if(data.instock < quantity){
        alert(`${product.name} Is Out Of Stock`)
        return
      }
      patchContxt({
        type: 'ADD_TO_CART',
        payload: {...product, price: discountrate ? discountrate : product.price, quantity}
      })
      toast.success('Your product added to cart', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark"
        });
    }

    //for adding wishlist to cart item 
    const handleWishlist =()=>{
      dispatch2({
        type: 'WISHLIST_TO_CART',
        payload: {...product}
      })
    }



    
    const handleRedirect = ()=>{
      navigate(`/cartpage`);
    }

    //for cupon

    const handlechange = ()=>{
      if(product.cuponcode != ""){
        if(product.cuponcode == cuponcode){
          let cupondiscount = (product.price * product.discount)/100
          let afterdiscount = product.price - cupondiscount
          if(afterdiscount < product.discountlimit){
            setCuponerror(`Must be up to ${product.discountlimit}% discount` );
          }
          else{
            setDiscountrate(afterdiscount);
          }
          
        }
        else{
          setCuponerror("Opps! cupon doesn't matched");
        }
      }
      else{
        setCuponerror("No cupon for this product")
      }
     
    }



  //slick-slider
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };


    
  return (
    <>
      <section id='product_details'>
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <Container>
            <Row>
              {product 
              
              ?
              <Col lg = {9} className='mx-auto'>
              <div className="productdetails">
                <Row>
                  <Col lg = {12}>
                    <div className="detail_header">
                      <h3>Deals Hot of The Day</h3>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg = {6}>
                    <div className="product_img">
                      {product.image && <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Wristwatch by Ted Baker London",
                                isFluidWidth: true,
                                src: `${product.image}`,
                                sizes:
                                  "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw"
                              },
                              largeImage: {
                                alt: "",
                                src: `${product.image}`,
                                width: 1200,
                                height: 1800
                              },
                              isHintEnabled: true
                            }}
                      />}
                       
                    </div>
                    <Col lg = {12}>
                      <div className="related-products">
                        <Row>
                        {relatedproducts.length > 0 

                            ?

                           
                              <Slider {...settings}>
                                {
                                  relatedproducts.map((item)=>(
                                    <Col lg = {3} className = "main-related">
                                          <div className="related-images">
                                            <Link to = {`/api/products/${item.slug}`}><img src={item.image} alt="" /></Link>
                                          </div>
                                    </Col>
                                  ))
                                }
                              </Slider> 

                            :


                            ""

                            }
                        </Row>
                      </div>     
                    </Col>
                  </Col>
                  <Col lg = {6}>
                      <Row>
                          <Col lg = {12}>
                              <div className="inner-product-name">
                                <h5>{product.name}</h5>
                              </div>
                          </Col>
                          <Col lg = {12}>
                            <div className="inner-product-price">
                              
                                {discountrate ? <del><h4>${product.price}</h4></del> : <h4>${product.price}</h4>}
                                {discountrate ? <h5>${discountrate}</h5> : ""}

                                
                                <div className="ratings">
                                  <Ratings rating = {product.rating} ratingnumber = {product.numberofrating}/>
                                </div>
                                <div className="stocks">
                                  {product.instock == 0
                                    ?
                                    <span style={{color: "#D63B24"}}>Total Stock: {product.instock}</span>
                                    
                                    :
                                    <span style={{color: "#2D5E2E"}}>Total Stock: {product.instock}</span>

                                  }
                                </div>
                            </div>
                          </Col>
                          <Col lg = {12}>
                                <div className="add-cart">
                                  <div className="cupon-code mb-3">
                                    <input onChange={e=>setCuponcode(e.target.value)} type="text" placeholder='Enter cupon' />
                                    <button onClick={handlechange} type='button'>Apply</button>
                                    <p>{cuponerror}</p>
                                  </div>
                                  {product.instock == 0
                                  ?
                                  <div className='d-flex justify-content-between'>
                                  <button style={{cursor: "not-allowed"}} disabled className='d-flex align-items-center' type='button'><BsBag style={{marginRight: "10px"}}/><span>Add to cart</span></button> 

                                  <button onClick={handleWishlist} className='whislist ' type='button'><span>Add to wishlist</span><BsHeart className='heart'></BsHeart></button>
                                  </div>
                                  
                                  
                                  :
                                  
                                  <div className='d-flex justify-content-between'>
                                  <button onClick={handleCart}   className='d-flex align-items-center' type='button'><BsBag style={{marginRight: "10px"}}/><span>Add to cart</span></button>
                                  <button onClick={handleWishlist} className='whislist' type='button'><span>Add to wishlist</span><BsHeart className='heart'></BsHeart></button>
                                 <ToastContainer onClick={handleRedirect}/>
                                  </div>
                                  }
                                </div>
                          </Col>
                      </Row>
                  </Col>
                </Row>
              </div>
          </Col>
            :
            <Errorpage></Errorpage>
            }
                
            </Row>
        </Container>
      </section>
    </>
  )
};

export default Productdetails;
