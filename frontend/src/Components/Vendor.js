import axios from 'axios'
import React, { useState,useContext } from 'react'
import { Col, Container, Row ,Form,Button} from 'react-bootstrap'
import { Store } from './Store'

const Vendor = () => {
    const {state3,dispatch3} = useContext(Store)
     const {userInfo} = state3
    const [open,setOpen] = useState(false)


    const handleAgree = ()=>{
        setOpen(!open)
    }


    const handleVendor = async ()=>{
        const data = await axios.put(`/api/userauth/${userInfo._id}`)
        console.log(data);
    }

  return (
    <>
        <section>
            <Container>
                <Row>
                    <Col lg = {6} className = "m-auto">
                        <div className="rules mt-5">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores a magnam alias inventore ipsum consequuntur cupiditate. Illo incidunt quisquam dolores quae? Dolorum odio labore minus expedita magnam, eveniet necessitatibus placeat nam natus aperiam numquam magni a quia nulla corrupti sunt eius vero nisi consequuntur? Consequatur tempora optio reiciendis nesciunt molestiae, corrupti, velit cumque dignissimos quasi dolores unde consectetur libero distinctio laboriosam deleniti rem ad ullam praesentium quo natus non eveniet! Deleniti, aliquam corrupti. Voluptatibus necessitatibus possimus iure, cum sit quam nisi sint nostrum obcaecati vel tenetur praesentium voluptas esse laboriosam, itaque odit? Accusamus sequi excepturi expedita, placeat necessitatibus saepe sed repellat pariatur ullam! Reiciendis quibusdam tempore ipsa quo? Non sit, libero illum distinctio, nisi, dolores nemo animi nesciunt ratione repellendus harum exercitationem. Odit assumenda eveniet ut asperiores ipsa maxime nesciunt provident libero maiores aut cumque nulla dolores dolor, veniam temporibus, dicta mollitia. Est dolorem facere reprehenderit ullam, id, dignissimos repellat consequuntur, aliquid voluptates ad eum. Sapiente accusamus dolor eum delectus harum modi tempore eius. Fuga voluptatum dolore quas temporibus velit autem eveniet in libero, minima aspernatur perferendis aliquid at, culpa laborum amet officia dicta totam! Fugit, vero repellat? Enim unde voluptatibus quasi magnam quis eum sunt incidunt animi cupiditate aperiam.</p>

                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Agree"
                            onChange={handleAgree}
                        />
                        <div className="vendor-button mt-5">
                            {
                                open
                                ?
                                <Button variant="primary" onClick={handleVendor} size="lg"> Beacome Vendor</Button>
                                :
                                <Button variant="primary" size="lg" disabled> Beacome Vendor</Button>
                            }
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    
    </>
  )
}

export default Vendor