import React, {useState} from 'react'
import { Form, Button, Container, Alert, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { signInUser } from "../redux/actions/action-helper";
import axios from "axios";
import * as V1APIS from "../apis/v1";

import firebase from "firebase"
import fire from "../fire";


const SignIn2 = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [unique, setUnique] = useState(true);

    
    
    function handleNickName(nickName){
        axios
      .get(`http://localhost:8080/api/users/unique/${nickName}`, {},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) =>{
        if(res.status === 200) {
            setNickName(nickName)
            setUnique(true)
        }else{
            setUnique(false)
        }
      })
      .catch((error) => {
            setNickName(nickName)
            setUnique(false)
        });
    }
    
    

    function handleSignUp(){
        axios
      .post(V1APIS.SIGN_IN_API,
        {
            name: name,
            email: email,
            nickName: nickName,
            password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }) //done
      .then((res) => {
        console.log("repsonse data: ", res.data);
        if (res.status === 201) {
            setSuccess(true);
            setWarning(false);
            fire.auth().createUserWithEmailAndPassword(email,password).then(
            ).then(()=>{
                fire.auth().currentUser.sendEmailVerification()
            }).catch((e)=>{
                console.log("create email on firebase fail")
            })
        }
      })
      .catch((error) => {
        setSuccess(false);
        setWarning(true);
      });
    }

    function handleSignUpGoogle(){
      
      fire.auth().signInWithPopup(provider).then(()=>{
            let user = fire.auth().currentUser.providerData[0]
            axios
      .post(V1APIS.SIGN_IN_API,
        {
            name: user.email,
            email: user.email,
            nickName: user.displayName,
            password: user.uid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }) //done
      .then((res) => {
        console.log("repsonse data: ", res.data);
        if (res.status === 201) {
            setSuccess(true);
            setWarning(false);
            fire.auth().currentUser.sendEmailVerification()
            
        }
      })
      .catch((error) => {
        setSuccess(false);
        setWarning(true);
      });
        }).catch(e=>{console.log(e)})
    }




    return (
        <Container className="container w-25">
            
        <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        {warning ? (
          <Alert variant="danger">Sign up failed</Alert>
        ) : null}
        {success ? (
          <Alert variant="success">Sign up Success</Alert>
        ) : null}


        <Form.Label className="font-weight-light m-3">
          INTRODUCE YOURSELF
        </Form.Label>

        <Form.Group className="m-2">
          <Form.Label>Hi there! My name is</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            required
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Label>Here's my email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jane@dow.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Label>Select a Unique NickName: </Form.Label>
          <Form.Control
            onChange={(e) => handleNickName(e.target.value)}
            type="text"
            value={nickName}
            required
          />
          <Form.Text style={{ color: "red" }} hidden={unique} muted>
            Not unique
          </Form.Text>
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Label>And here's my Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <Row>
        <Button variant="outline-primary" type="submit" className="m-2">
          Sign me up!
        </Button>
        </Row>
        
      </Form>
      <Row>
      <Button variant="outline-primary" className="m-2" onClick={handleSignUpGoogle}>
            sign up with Google
      </Button>
      </Row>
      </Container>
    )
}

export default connect(null, { signInUser })(SignIn2)

