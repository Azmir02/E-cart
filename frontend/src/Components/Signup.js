import React,{useState,useContext} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { BsEyeFill,BsEyeSlashFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Store } from './Store';

const Signup = () => {
    const [showpass,setPass] = useState('password')
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpass,setConfirmpass] = useState('')

    let showPass = ()=>{
        if(showpass == 'password'){
          setPass('text')
        }
        else{
          setPass('password')
        }
      }

        //userSignin
        const {state3,dispatch3} = useContext(Store)
        const navigate = useNavigate()
      

  const handleSignup = async (e)=>{
    e.preventDefault()
    try{
        const {data} = await axios.post("/api/userauth/usersignup",{
            name,
            email,
            password
        })
        navigate("/signin")
    }
    catch(err){
      toast.error('Invalid email or password', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

    let {search} = useLocation()
    let redirectUrl = new URLSearchParams(search).get('redirect')
    let redirect = redirectUrl ? redirectUrl : "/"
  return (
    <>
        <section id='signup-form'>
            <Container>
                <Row>
                    <Col lg = {4} className = "m-auto text-center">
                        <div className="signup-header text-center mt-5">
                            <h4>Registration</h4>
                            <p>It's Completely free</p>    
                        </div>
                        <form onSubmit={handleSignup} action="#" className='mt-5'>
                            <div className="form-field-signup">
                                <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder='Full name' />    
                            </div>    
                            <div className="form-field-signup">
                                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Email address' />    
                            </div>    
                            <div className="form-field-signup password">
                                <input value={password} onChange={e=>setPassword(e.target.value)} type= {showpass} placeholder='Password' />    
                                {showpass == "text" ? <BsEyeFill className='eye' onClick={showPass}></BsEyeFill>  : <BsEyeSlashFill onClick={showPass} className='eye'></BsEyeSlashFill>}
                            </div>    
                            <div className="form-field-signup">
                                <input value={confirmpass} onChange={e=>setConfirmpass(e.target.value)} type="password" placeholder='Confirm Password' />    
                            </div> 
                            <div className="signup-button">
                                <button type='submit'>Registration</button>    
                            </div>   
                        </form>
                        <p>Already have an account? <Link to = {`/signin?redirect=${redirect}`}>Sign in</Link></p>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Signup