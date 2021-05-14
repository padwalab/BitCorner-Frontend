import React, {useState} from 'react'
import { Form, Button, Container, Alert, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { signInUser } from "../redux/actions/action-helper";
import axios from "axios";
import * as V1APIS from "../apis/v1";

import {useSelector, useDispatch} from 'react-redux';
import {logInUser} from '../redux/actions/action-helper';


import firebase from "firebase"
import fire from "../fire";
import { Redirect } from 'react-router';
import validator from 'validator';


const Login2 = (props) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState(false);
    const [emailVerify, setEmailVerify] = useState(false);
    
    const dispatch = useDispatch();

    function handleLogin(){
        
        fire.auth().signInWithEmailAndPassword(email, password).then((result)=>{
            

        }).then(()=>{
            setEmailVerify(fire.auth().currentUser.emailVerified)

            if(!emailVerify) {
                setWarning(true)
            }
            else{
                axios.post(V1APIS.LOG_IN_API,
                    {
                        email: email,
                        password: password,
                    },
                    {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    }) //done
                .then((res) => {
                    console.log("repsonse data: ", res.data);
                    if (res.status === 200 && emailVerify) {
                        dispatch(logInUser(res.data))
                        return <Redirect to="/dashboard" />;
                    }
                })
                .catch((error) => setWarning(true));
            }
            
        }).catch((e)=>{console.log(e)})



        
        
            
        
    
    }

    function handleLoginGoogle(){

        fire.auth().signInWithPopup(provider).then(()=>{
              
            const data = fire.auth().currentUser.providerData[0]
                console.log("hello: "+ JSON.stringify(data))
              setEmail(data.email)
              setPassword(data.uid)  

            if(fire.auth().currentUser.emailVerified) {

              
              
              axios
                .post(V1APIS.LOG_IN_API,
                    {
                        email: email,
                        password: password,
                    },
                    {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    }) //done
                .then((res) => {
                  console.log("repsonse data: ", res.data);
                  if (res.status === 200) {
                    dispatch(logInUser(res.data))
                    return <Redirect to="/dashboard" />;
                  }
                })
                .catch(setWarning(true));
              console.log(this.state);

            }else{
                setWarning(true)
            }
          }).catch((e)=>{console.log(e)})
        
    }

    
    let logInForm = (          
        <Form
            onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
            }}
        >
            {warning ? (
            <Alert variant="danger">Invalid User creadentials or unverify</Alert>
            ) : null}

            <Form.Label className="font-weight-light m-3">
                WELCOME TO BITCORNER
            </Form.Label>

            <Form.Group className="m-2">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
                type="email"
                placeholder="jane@dow.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
            </Form.Group>

            <Form.Group className="m-2">
            <Form.Label>Password:</Form.Label>
            <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
            />
            </Form.Group>
            <Form.Group>
                <Button className="m-2" variant="outline-primary" type="submit">
                    Log in
                </Button> 
            </Form.Group>
        </Form>
    );
     
    const isLoggedIn = useSelector(state =>state.isLoggedIn)
    return (
    <Container className="container w-25">
        <Row>
            {warning}
            {isLoggedIn ? <Redirect to="/dashboard" /> : logInForm}
        </Row>
        <Button className="m-2" variant="outline-primary" onClick={handleLoginGoogle}>Login with Google</Button>
    </Container>
    )
}

export default connect(null, { signInUser })(Login2)

