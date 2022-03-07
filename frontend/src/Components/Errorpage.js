import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Helmet} from 'react-helmet-async';
import err from '../errpage.png'

const Errorpage = () => {
  return (
        <>
            <section id='error'>
                <Helmet>
                    <title>
                        Page not found
                    </title>
                </Helmet>
                <Row>
                    <Col lg = {12}>
                        <div className="error-topic">
                            <div className="content-err">
                                <img src={err} alt="err"  className='w-100 img-fluid'/>
                            </div>
                            <div className="err-text">
                                <h3>Opps! Page Not Found</h3>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
  )
}

export default Errorpage