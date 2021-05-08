import React, { Component } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { signInUser } from "../redux/actions/action-helper";
import axios from "axios";
import { Redirect } from "react-router";
import * as V1APIS from "../apis/v1";
class Signin extends Component {
  state = {
    name: "Abhijeet Padwal",
    email: "a@a.com",
    password: "a",
    nickName: "a",
    warning: false,
    success: false,
  };
  handleName = (name) => {
    this.setState({ name });
  };

  handleNickName = (nickName) => {
    this.setState({ nickName });
  };

  handleEmail = (email) => {
    this.setState({ email });
  };
  handlePassword = (password) => {
    this.setState({ password });
  };

  handleSignInUser = (e) => {
    const { success, warning, ...payload } = this.state;
    e.preventDefault();
    axios
      .post(V1APIS.SIGN_IN_API, payload) //done
      .then((res) => {
        console.log("repsonse data: ", res.data);
        if (res.status === 201) {
          this.setState({ success: true, warning: false });
          <Redirect to="/home" />;
        }
      })
      .catch((error) => this.setState({ success: false, warning: true }));
    console.log(this.state);
  };
  render() {
    let signInForm;
    signInForm = (
      <Form onSubmit={this.handleSignInUser}>
        {this.state.warning ? (
          <Alert variant="danger">Sign in failed</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Sign up Success</Alert>
        ) : null}

        <Form.Label className="font-weight-light m-3">
          INTRODUCE YOURSELF
        </Form.Label>

        <Form.Group className="m-2">
          <Form.Label>Hi there! My name is</Form.Label>
          <Form.Control
            onChange={(e) => this.handleName(e.target.value)}
            type="text"
            value={this.state.name}
            required
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Label>Here's my email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jane@dow.com"
            onChange={(e) => this.handleEmail(e.target.value)}
            value={this.state.email}
            required
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Label>Select a Unique NickName: </Form.Label>
          <Form.Control
            onChange={(e) => this.handleNickName(e.target.value)}
            type="text"
            value={this.state.nickName}
            required
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Label>And here's my Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => this.handlePassword(e.target.value)}
            value={this.state.password}
            required
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit" className="m-2">
          Sign me up!
        </Button>
      </Form>
    );
    return <Container className="container w-25">{signInForm}</Container>;
  }
}
export default connect(null, { signInUser })(Signin);
