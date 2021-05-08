import React, { Component } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logInUser } from "../redux/actions/action-helper";

class Login extends Component {
  state = {
    email: "",
    password: "",
    warning: false,
  };

  handleEmail = (email) => {
    this.setState({ email });
  };

  handlePassword = (password) => {
    this.setState({ password });
  };

  handleLogin = (e) => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:8000/users/login", { ...this.state }) //done
    //   .then((res) => {
    //     console.log("repsonse data: ", res.data);
    //     if (res.status === 200) {
    //       this.props.logInUser(res.data);
    //     }
    //   })
    //   .catch((error) => this.setState({ warning: true }));
    console.log(this.state);
    if (this.state.email === "a@g.com" && this.state.password === "a") {
      this.props.logInUser(this.state);
    }
    // this.setState({ email: "", password: "", warning: false });
  };
  render() {
    let logInForm;
    logInForm = (
      <Form onSubmit={(e) => this.handleLogin(e)}>
        {this.state.warning ? (
          <Alert variant="danger">Invalid User creadentials</Alert>
        ) : null}

        <Form.Label className="font-weight-bold mt-3">
          WELCOME TO BITCORNER
        </Form.Label>

        <Form.Group className="mt-2">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jane@dow.com"
            onChange={(e) => this.handleEmail(e.target.value)}
            value={this.state.email}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            onChange={(e) => this.handlePassword(e.target.value)}
            type="password"
            value={this.state.password}
            required
          />
        </Form.Group>
        <Form.Group>
          <Button className="mt-2" variant="outline-primary" type="submit">
            Log in
          </Button>
        </Form.Group>
      </Form>
    );
    return (
      <Container className="container w-25">
        {this.warning}
        {this.props.isLoggedIn ? <Redirect to="/home/dashboard" /> : logInForm}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logInUser })(Login);