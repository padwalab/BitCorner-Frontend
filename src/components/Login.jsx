import axios from "axios";
import React, { Component } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as V1APIS from "../apis/v1";
import { logInUser } from "../redux/actions/action-helper";

class Login extends Component {
  state = {
    email: "a@a.com",
    password: "a",
    warning: false,
  };

  handleEmail = (email) => {
    this.setState({ email });
  };

  handlePassword = (password) => {
    this.setState({ password });
  };

  handleLogin = (e) => {
    const { warning, ...loginData } = this.state;
    e.preventDefault();
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
      <Form onSubmit={(e) => this.handleLogin(e)}>
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
        {this.warning}
        {this.props.isLoggedIn ? <Redirect to="/dashboard" /> : logInForm}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logInUser })(Login);
