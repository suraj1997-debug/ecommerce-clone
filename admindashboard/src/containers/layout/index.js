import React from 'react';
import './style.css';
import { Col, Container,Row } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Header from '../../components/header';

function Layout(props){
    return(
        <>
        <Header/>
        {
        props.sidebar ?
         <Container fluid>
            <Row>
                <Col md={2} className="sidebar">
                <ul>
                   
                <li> <NavLink exact to={`/`} >Home</NavLink> </li>
                <li> <NavLink to={`/page`} >Page</NavLink> </li>
                <li> <NavLink to={`/Categories`} >Category</NavLink> </li> 
                <li> <NavLink to={`/Products`} >Products</NavLink> </li>
                <li>  <NavLink to={`/Orders`} >Orders</NavLink> </li>
                   
                </ul>
                </Col>
                <Col md={10} style={{textAlign:'left',marginLeft:'auto',marginTop:"2.9rem"}}>
                {props.children}
                    </Col>
            </Row>
        </Container>
        :props.children
       }
        </>
    )
}

export default Layout;