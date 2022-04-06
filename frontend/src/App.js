import { useContext ,useState,useReducer,useEffect} from 'react';
import {Container,Nav,Navbar,Badge,Offcanvas,Row,Col,Accordion,ListGroup} from 'react-bootstrap'
import {Routes,Route,NavLink, Link,useNavigate, useLocation} from "react-router-dom";
import { BsCart3,BsHeart } from "react-icons/bs";
import logo from './logo.png'
import Homepage from './Components/Homepage';
import Productpage from './Components/Productpage';
import Productdetails from './Components/Productdetails';
import Signin from './Components/Signin';
import Cartpage from './Components/Cartpage';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from './Components/Store';
import Wishlist from './Components/Wishlist';
import { BsSearch,BsReplyAllFill } from "react-icons/bs";
import axios from 'axios'
import Compare from './Components/Compare';
import Shipping from './Components/Shipping';
import Signup from './Components/Signup';
import Payment from './Components/Payment';
import Placeorder from './Components/Placeorder';


//reducer
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



function App() {
  let navigate = useNavigate()
  let [searchtopic,setSearchtopic] = useState("")
  let [searchresult,setSearchresult] = useState([])
  let [phone,setPhone] = useState("")
  let [category,setCategory] = useState([])


  const [{isLoading,product,error}, dispatch] = useReducer(reducer, {
    isLoading: false,
    product: [],
    error: ''
  });


  const {state,dispatch:contextpatch,state2,dispatch2,state3,dispatch3} = useContext(Store)
  const {cart:{cartItems}} = state
  const {Wishlist:{WishlistItems}} = state2
  const {userInfo} = state3

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Cartupdate = (item,quantity)=>{
    contextpatch({
        type: 'ADD_TO_CART',
        payload: {...item,quantity}
    })
  }


  useEffect( ()=>{
    const loaddata = async ()=>{
      dispatch({type:'FETCH_REQUEST'})
    try{
      let productinfo = await axios.get('/api/products')
      dispatch({type:'FETCH_SUCCESS', payload:productinfo.data})
    }catch(err){
      dispatch({type:'FETCH_ERROR', payload:err.message})
    }
    }
    loaddata()
  },[])

    //for delete cart
    const handleDelete = (item)=>{
      contextpatch({
          type: 'DELETE_CART',
          payload: item
      })
    }

    //canvas button click to redirect 

    const handleRedirect = ()=>{
        navigate(`/cartpage`)
        setShow(false)
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

  //for number

  useEffect(()=>{
    const numbers = async ()=>{
      let phone = await axios.get('/phone')
      setPhone(phone.data);
    }

    numbers()
  },[])


  //for category
  let categoryarray = []
  useEffect(()=>{
    product.map((item)=>{
      if(categoryarray.indexOf(item.category) == -1){
        categoryarray.push(item.category)
      }
    })
    setCategory(categoryarray)
  },[product])


    



  const handleSignout = ()=>{
    dispatch3({
      type: "USER_LOGOUT",
    })
    localStorage.removeItem("userInfo")
  }



  //not to redirect signin page when user logged in

  useEffect(()=>{
    if(userInfo){
      navigate('/')
    }
  },[])



  return (
    <>
        <div className="top-header">
          <Container>
            <Row>
              <Col lg = {6}>
                 <div className="language">
                  language    
                </div> 
              </Col>
              <Col lg = {6}>
                  <div className="call text-end">
                      <p>Call us: <a href= {`tel:${phone.phone}`}>+{phone.phone}</a> </p>    
                  </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Navbar>
          <Container>
          <Navbar.Brand className='logo' >
            <Link to = "/">
              <img  src= {logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Nav className="m-auto serch-product">
          <input onChange={handleChange} type="text" placeholder='Search Product...' />
              <BsSearch onClick = {handleSearch}></BsSearch>
          </Nav>
          <Nav className="menu_bar">
          <div className="cart text-center" onClick={handleShow}>
               
               <BsCart3></BsCart3>
               {state.cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                  {state.cart.cartItems.length}
                 </Badge>
                )
               }
          </div>
          </Nav>
          <Nav className="menu_bar2">
               <Link to = '/wishlist'>
                <div className="cart text-center">
                <BsHeart></BsHeart>
                {state2.Wishlist.WishlistItems.length > 0 && (
                    <Badge pill bg="danger">
                    {state2.Wishlist.WishlistItems.length}
                  </Badge>
                  )
                }
                </div>

               </Link>
          </Nav>
          </Container>
        </Navbar>


        {/*for bottom nav*/}
        <Navbar className='second-bar'>
          <Container>
          <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className='cat-icon'><BsReplyAllFill></BsReplyAllFill>Browse Category</Accordion.Header>
                <Accordion.Body>
                  {category.map((item)=>(
                    <ListGroup>
                      <ListGroup.Item>{item}</ListGroup.Item>
                  </ListGroup>
                  ))}
                
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          <Nav className="m-auto menu_bar">
            <li>
              <NavLink  to = "/">Home</NavLink>
            </li>
            <li>
              <NavLink  to = "/api/products">Products</NavLink>
            </li>
            <li>
              <NavLink  to = "/compare">Compare</NavLink>
            </li>
          </Nav>
          <Nav className="user">
          <div className="users text-center">
                  {userInfo ? 
                   <>
                     <div className="main-userdropdown">
                      <p>{userInfo.name}</p>
                        <div className="dropdownuser">
                            <span>My account</span>
                            <span>Change profile picture</span>
                            <span onClick={handleSignout}>Logout</span>
                        </div> 
                      </div>
                   </>
                  :
                  <Link to = {`/signin?redirect=/shipping`}>Login</Link>

                }
                </div>
          </Nav>
          </Container>
        </Navbar>

        <Offcanvas  show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h3>Carts Item List's</h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
                {cartItems.length == 0 
                ?
                  <div className="erro-cart">
                    <p>Opps! please add your product</p>
                  </div>
                :
                <>
                  {cartItems.map((item)=>(
                        <>
                            <div className='cart-page-details text-center'>
                                <Row className='align-items-center'>
                                        <Col lg = {3}>
                                                <div className="image-det">
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className="image-det-name">
                                                    <Link to = {`/api/products/${item.slug}`}>{item.name}</Link>
                                                </div>      
                                          </Col>  
                                    <Col lg = {3}>
                                        <div className="cart-inc-Or-dec canvas">
                                        <div className="inner-btns d-flex align-items-center justify-content-between">
                                                    <button onClick={()=>Cartupdate(item,item.quantity - 1)}  disabled = {item.quantity == 1}><i class="fa-solid fa-circle-minus"></i></button>
                                                     <span>{item.quantity}</span>
                                                    <button onClick={()=>Cartupdate(item,item.quantity + 1)} disabled = {item.quantity == item.instock}><i class="fa-solid fa-circle-plus"></i></button>
                                          </div>
                                        </div>    
                                    </Col>    
                                    <Col lg = {3}>
                                    <div className="subtotal">
                                        <p>${item._id  ? `${item.quantity * item.price.toFixed()}` : item.price}</p>
                                    </div>
                                       
                                    </Col>    
                                    <Col lg = {3}>
                                        <div className="delete-button canvas-button">
                                            <button onClick={()=>handleDelete(item)} type='buttton'>Delete</button>    
                                        </div>    
                                    </Col>    
                                </Row>    
                            </div>    
                      </>
                            
                        ))}
                </>
                }

                <div className="cart-view">
                  <button  onClick={handleRedirect} type = "button">View Your Cart</button>
                </div>
          </Offcanvas.Body>
        </Offcanvas>





        

      <Routes>
        <Route path = "/" element = {<Homepage/>}></Route>
        <Route path = "/api/products" element = {<Productpage/>}></Route>
        <Route path = "/api/products/:slug" element = {<Productdetails/>}></Route>
        <Route path = "/cartpage" element = {<Cartpage/>}></Route>
        <Route path = "/signin" element = {<Signin/>}></Route>
        <Route path = "/signup" element = {<Signup/>}></Route>
        <Route path = "/wishlist" element = {<Wishlist/>}></Route>
        <Route path = "/placeorder" element = {<Placeorder/>}></Route>
        <Route path = "/payment" element = {<Payment/>}></Route>
        <Route path = "/compare" element = {<Compare/>}></Route>
        <Route path = "/shipping" element = {<Shipping/>}></Route>
      </Routes>

     
    </>
  );
}

export default App;
