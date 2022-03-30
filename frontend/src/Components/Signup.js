import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Signup = () => {
  return (
    <>
        <section id='signup-form'>
            <Container>
                <Row>
                    <Col lg = {6} className = "m-auto">
                        
                        <h1>Signup</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default Signup