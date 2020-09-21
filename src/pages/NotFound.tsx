import React from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Routes } from '../routes/Routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
    return <>
        <Container>
            <Row className="d-flex" style={{height: "100vh"}}>
                <Col xs={9} md={6} className="m-auto d-flex">
                    <Row>
                        <Col xs={12} className="d-flex">
                            <Image fluid className="mx-auto w-50" src="/assets/medusa-original.png" draggable={false} />
                        </Col>
                        <Col xs={12} className="d-flex">
                            <h3 className="mx-auto">
                                404: Page not found
                            </h3>
                        </Col>
                        <Col xs={12} className="d-flex">
                            <Link className="mx-auto" to={Routes.public.home}>
                                <FontAwesomeIcon icon={faArrowCircleLeft} /> Back to home</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>    
    </>
}