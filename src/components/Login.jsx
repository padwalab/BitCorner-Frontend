import axios from "axios";
import React, { Component } from "react";
import { Alert, Button, Container, Form, Row } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as V1APIS from "../apis/v1";
import { logInUser } from "../redux/actions/action-helper";
import fire from "../fire"

class Login extends Component {
  state = {
    email: "a.a@gmail.com",
    password: "a",
    warning: false,
  };

  handleEmail = (email) => {
    this.setState({ email });
  };

  handlePassword = (password) => {
    this.setState({ password });
  };

  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    const { email, googleId } = response.profileObj;
    this.setState({
      email,
      password: googleId,
    });
    this.handleLogin();
  };

  handleLogin = () => {
    const { warning, ...loginData } = this.state;

    axios
      .post(V1APIS.LOG_IN_API, loginData) //done
      .then((res) => {
        console.log("repsonse data: ", res.data);
        if (res.status === 200) {
          this.props.logInUser(res.data);
        }
      })
      .catch((error) => this.setState({ warning: true }));
    console.log(this.state);
    // this.setState({ email: "", password: "", warning: false });
  };
  render() {
    let logInForm;
    logInForm = (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleLogin();
        }}
      >
        {this.state.warning ? (
          <Alert variant="danger">Invalid User creadentials</Alert>
        ) : null}

        <Form.Label className="font-weight-light m-3">
          WELCOME TO BITCORNER
        </Form.Label>

        <Form.Group className="m-2">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jane@dow.com"
            onChange={(e) => this.handleEmail(e.target.value)}
            value={this.state.email}
            required
          />
        </Form.Group>

        <Form.Group className="m-2">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            onChange={(e) => this.handlePassword(e.target.value)}
            type="password"
            value={this.state.password}
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
    return (
      <Container className="container w-25">
        <Row>
          {this.warning}
          {this.props.isLoggedIn ? <Redirect to="/dashboard" /> : logInForm}
        </Row>
        <Row>
          <GoogleLogin
            clientId="997333689935-7qa58drcpi254ke1eips2vqft4k5ss8a.apps.googleusercontent.com"
            buttonText="LogIn"
            onSuccess={this.responseGoogle}
            onFailure={this.failureResponseGoogle}
            cookiePolicy={"single_host_origin"}
            className="m-2"
            // disabled={!this.state.unique ? true : false}
          />
        </Row>
        
        
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logInUser })(Login);
