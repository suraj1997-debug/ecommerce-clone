import React,{useEffect, useState} from 'react';
import {useSelector,useDispatch, connect} from 'react-redux';
import { Button, Container, Form,Row,Col } from 'react-bootstrap';
import { Link,Redirect } from 'react-router-dom';
import Layout from './layout';
import { loginUser} from '../redux/store/index';

function LoginContainer(props) {

    const [email,setemail] = useState("");
    const [password,setpassword]=useState("");

  
   const dispatch = useDispatch();
 

   
   
   const userLogin=(email,password)=>{
        
       dispatch(loginUser(email,password));
   }
    
   const auth = useSelector(state=>state.auth)


   if(auth.authenticate){
     return  <Redirect to={`/`} />
   }
    

    return (
        <>
            <Layout>
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Form   style={{ boxShadow: "2px 2px 8px black", padding: "10px", height: "26rem", width: "31rem",marginTop:"6rem",padding:"2rem 0" }} >
                    <p>{props.msg}</p>
                    <h1 className="textCenter" style={{fontSize:'none !important'}}  >SignIn</h1>
                    <br /><br />
                    <Form.Group as={Row} controlId="email" >
                        <Form.Label column sm={4}>Email</Form.Label>
                        <Col sm={7}>
                        <Form.Control type="email" value={email} onChange={e=>setemail(e.target.value)} autoComplete="off" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="password">
                        <Form.Label column sm={4}>Password</Form.Label>
                        <Col sm={7}>
                        <Form.Control type="password" value={password} onChange={e=>setpassword(e.target.value)} autoComplete="off" />  
                        </Col>
                    </Form.Group>
                    <br />
                    <Button variant="primary" onClick={()=>userLogin(email,password)}>Signin</Button>
                    <br /><br />
                    <p>Don't Have an Account!<Link to="/signUp" > Register Here</Link></p>
                </Form>
            </Container>
            </Layout>
        </>
    );
}





export default LoginContainer;