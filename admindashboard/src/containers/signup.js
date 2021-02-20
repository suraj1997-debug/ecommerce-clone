import React,{useState} from 'react';
import {connect,useSelector} from 'react-redux';
import { Button, Container, Form,Row,Col } from 'react-bootstrap';
import { Link ,Redirect} from 'react-router-dom';
import Layout from './layout';
import {signupUser} from '../redux/store/index';

function SignupContainer(props) {

    const [firstname,setfirstname]=useState("");
    const [lastname,setlastname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const auth = useSelector(state=>state.auth);

   if(auth.authenticate){
      return <Redirect to={`/`} />
   }
    
    return (
        <>
            <Layout>
            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
           {props.loading}  
                <Form className="Form" style={{ boxShadow: "2px 2px 8px black", padding: "10px", height: "28rem", width: "31rem", marginTop: "4.9rem" }} >
                    <p>{props.msg}</p>
                    <h1 className="textCenter" style={{fontSize:'none !important'}}>SignUp</h1>
                    <br />
                    <Form.Group as={Row} controlId="firstname" >
                        <Form.Label column sm={4}>First Name</Form.Label>
                        <Col sm={7}>
                            <Form.Control type="text" value={firstname} onChange={e=>setfirstname(e.target.value)} autoComplete="off" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="lastname" >
                        <Form.Label column sm={4}>Last Name</Form.Label>
                        <Col sm={7}>
                            <Form.Control type="text" value={lastname} onChange={e=>setlastname(e.target.value)} autoComplete="off" />
                        </Col>
                    </Form.Group>

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

                    <Button variant="primary" onClick={()=>props.user(firstname,lastname,email,password)}>SignUp</Button>
                    <br /><br />
                    <p>Already Have an Account?<Link to="/signIn"> Login Here</Link></p>
                </Form>
            </Container>
            </Layout>
        </>
    );
}


const MapStatetoProps=(state)=>{
    return{
        loading:state.user.loading,
        msg:state.user.msg
    }
}

const MapDispatchtoProps=(dispatch)=>{
    return{
        user:function(firstname,lastname,email,password){
            dispatch(signupUser(firstname,lastname,email,password));
        }
    }
}

export default connect(MapStatetoProps,MapDispatchtoProps)(SignupContainer);