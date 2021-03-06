import React, { Component } from "react";
import { Form, Button, Container, Alert, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { signInUser } from "../redux/actions/action-helper";
import axios from "axios";
import { Redirect } from "react-router";
import * as V1APIS from "../apis/v1";
import GoogleLogin from "react-google-login";
class Signin extends Component {
  state = {
    name: "Abhijeet Padwal",
    email: "a@a.com",
    password: "a",
    nickName: "a",
    warning: false,
    success: false,
    unique: true,
  };
  handleName = (name) => {
    this.setState({ name });
  };

  handleNickName = (nickName) => {
    if (nickName !== "") {
      axios
        .get(`http://${V1APIS.SERVER}/api/users/unique/${nickName}`)
        .then((res) =>
          res.status === 200
            ? this.setState({ nickName, unique: true })
            : this.setState({ unique: false })
        )
        .catch((error) => this.setState({ nickName, unique: false }));
      // this.setState({ nickName });
    }
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
    const { email, name, googleId } = response.profileObj;
    this.setState({
      name,
      email,
      password: googleId,
      nickName: this.state.nickName,
    });
    this.handleSignInUser();
  };
  failureResponseGoogle = (response) => {
    console.log(response);
  };

  handleSignInUser = () => {
    const { success, warning, ...payload } = this.state;
    // e.preventDefault();
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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSignInUser();
        }}
      >
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
          <Form.Text style={{ color: "red" }} hidden={this.state.unique} muted>
            Not unique
          </Form.Text>
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
    return (
      <Container className="container w-25">
        <Row>{signInForm}</Row>
        <Row>
          <GoogleLogin
            clientId="997333689935-7qa58drcpi254ke1eips2vqft4k5ss8a.apps.googleusercontent.com"
            buttonText="SingIn"
            onSuccess={this.responseGoogle}
            onFailure={this.failureResponseGoogle}
            cookiePolicy={"single_host_origin"}
            disabled={!this.state.unique ? true : false}
          />
        </Row>
      </Container>
    );
  }
}
export default connect(null, { signInUser })(Signin);
