import React,{useEffect,useReducer,useContext, useState} from 'react';
import { Container,Card ,Button,Spinner,Row,Col} from 'react-bootstrap';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet} from 'react-helmet-async';
import { BsSearch } from "react-icons/bs";
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








const Productpage = () => {
  let navigate = useNavigate()

  const {state,dispatch: patchContxt} = useContext(Store)
  const {cart:{cartItems}} = state

  let [searchtopic,setSearchtopic] = useState("")
  let [searchresult,setSearchresult] = useState([])


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
  const handleRedirect = ()=>{
    navigate(`/cartpage`);
  }

  //for search-product
  const handleChange = (e)=>{
    setSearchtopic(e.target.value)
    if(e.target.value){
      let searcharr = []
      product.map((item)=>{
      if(item.name.includes(searchtopic.toLowerCase())){
          searcharr.push(item)
        }
      })
      setSearchresult(searcharr)
    }
    else{
      setSearchresult([])
    }

  }

  const handleSearch = async ()=>{
    let searcharr = []
    product.map((item)=>{
     if(item.name.includes(searchtopic.toLowerCase())){
        searcharr.push(item)
      }
    })
    setSearchresult(searcharr)
  }


  return (
    <>
        <div className="product_body">
          <Helmet>
            <title>
                Product page
            </title>
          </Helmet>
          <Container>
            <div className="serch-product">
              <input onChange={handleChange} type="text" placeholder='Search Product...' />
              <BsSearch onClick = {handleSearch}></BsSearch>
            </div>
              <div className="inner_body">
                  { isLoading  ?
                    <div className="loader">
                        <Spinner animation="grow" />
                    </div>
                  :
                  searchresult.length == 0
                  ?
                  product.map((item)=>(
                      <>
                        <Col lg = {3}>
                            <div className="card">
                              {item.totalsale > 50
                               ?
                                  <div className="best-sale">
                                    <img src={item.bestsalepng} alt="" />
                                  </div>
                                :

                                ""  
                            
                              }
                              <div className="card-img">
                                <img src={item.image} alt="image" />
                              </div>
                              <div className="card-details text-center">
                                  <p>{item.desciprtion}</p>
                                  <h4>${item.price}</h4>
                                  <h5><Link to = {`/products/${item.slug}`}>{item.name} <span>{item.model}</span> </Link></h5>
                                  <div className="left-rating">
                                    <Ratings rating = {item.rating} ratingnumber = {item.numberofrating}/>
                                  </div>
                                  <div className="right-button text-center w-100">
                                    {item.instock == 0
                                        ?
                                        <>
                                        <Button onClick={()=>handleCart(item)} className='danger' variant="primary">Out Of Stock</Button>
                                        </>
                                        :
                                        <>
                                        <Button onClick={()=>handleCart(item)} variant="primary">{item.button}</Button>
                                        <ToastContainer onClick={handleRedirect}/>
                                        </>
                                    }
                                </div>
                              </div>
                            </div>
                            
                          </Col>
                      </>
                  ))
                  :
                  searchresult.map((item)=>(
                    <>
                      <Col lg = {3}>
                          <div className="card">
                            {item.totalsale > 50
                             ?
                                <div className="best-sale">
                                  <img src={item.bestsalepng} alt="" />
                                </div>
                              :

                              ""  
                          
                            }
                            <div className="card-img">
                              <img src={item.image} alt="image" />
                            </div>
                            <div className="card-details text-center">
                                <p>{item.desciprtion}</p>
                                <h4>${item.price}</h4>
                                <h5><Link to = {`/products/${item.slug}`}>{item.name} <span>{item.model}</span> </Link></h5>
                                <div className="left-rating">
                                  <Ratings rating = {item.rating} ratingnumber = {item.numberofrating}/>
                                </div>
                                <div className="right-button text-center w-100">
                                  {item.instock == 0
                                      ?
                                      <>
                                      <Button onClick={()=>handleCart(item)} className='danger' variant="primary">Out Of Stock</Button>
                                      </>
                                      :
                                      <>
                                      <Button onClick={()=>handleCart(item)} variant="primary">{item.button}</Button>
                                      <ToastContainer onClick={handleRedirect}/>
                                      </>
                                  }
                              </div>
                            </div>
                          </div>
                          
                        </Col>
                    </>
                ))
                }
              </div>
          </Container>
        </div>
    </>
  )
};

export default Productpage;

