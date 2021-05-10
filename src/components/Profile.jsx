import React, { Component } from "react";
import { Col, Container, Form, Row, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { updateProfile } from "../redux/actions/action-helper";
import axios from "axios";

class Profile extends Component {
  state = {
    name: this.props.currentUser.name,
    email: this.props.currentUser.email,
    password: this.props.currentUser.password,
    nickName: this.props.currentUser.nickName,
    address: this.props.currentUser.address
      ? this.props.currentUser.address
      : { street: "", city: "", state: "", zip: 0 },
    success: false,
    warning: false,
  };

  handleName = (name) => {
    this.setState({ name });
  };

  handlePassword = (password) => {
    this.setState({ password });
  };

  handleStreet = (street) => {
    this.setState({ address: { ...this.state.address, street } });
  };
  handleCity = (city) => {
    this.setState({ address: { ...this.state.address, city } });
  };
  handleState = (state) => {
    this.setState({ address: { ...this.state.address, state } });
  };
  handleZip = (zip) => {
    this.setState({ address: { ...this.state.address, zip } });
  };

  handleUpdateProfile = (e) => {
    e.preventDefault();
    let cloneState = Object.assign({}, this.state);
    delete cloneState.success;
    delete cloneState.warning;
    delete cloneState.email;
    console.log(this.state);
    axios
      .put(`http://localhost:8080/api/users/${this.props.currentUser.id}`, {
        //done
        ...cloneState,
      })
      .then((res) => {
        console.log("repsonse data: ", res.data);
        this.setState({ success: true, warning: false });
        this.props.updateProfile(res.data);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ warning: true, success: false });
      });
  };
  render() {
    const { name, email, password, nickName, address } = this.state;
    let profile = (
      <Form onSubmit={this.handleUpdateProfile}>
        {this.state.warning ? (
          <Alert variant="danger">Sign in failed</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Sign up Success</Alert>
        ) : null}

        <Row>
          <Form.Label className="m-2">
            <h1 className="font-weight-light display-5">YOUR PROFILE</h1>
          </Form.Label>
        </Row>
        <Row>
          <Col>
            <Form.Group className="m-2">
              <Form.Label className="font-weight-light m-2">Name:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleName(e.target.value)}
                type="text"
                value={this.state.name}
                required
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">EMAIL:</Form.Label>
              <Form.Control
                className="m-2"
                type="email"
                value={this.state.email}
                readOnly
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">Unique NickName: </Form.Label>
              <Form.Control
                className="m-2"
                type="text"
                value={this.state.nickName}
                readOnly
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">Password:</Form.Label>
              <Form.Control
                className="m-2"
                type="password"
                value={this.state.password}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="m-2">
              <Form.Label className="m-2">STREET:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleStreet(e.target.value)}
                type="text"
                value={address.street}
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">CITY:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleCity(e.target.value)}
                type="text"
                value={address.city}
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">STATE:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleState(e.target.value)}
                type="text"
                value={address.state}
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">ZIP:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleZip(e.target.value)}
                type="number"
                value={address.zip}
              />
            </Form.Group>
            <Button
              className="m-2"
              variant="outline-primary"
              type="submit"
              className="m-2 "
            >
              UPDATE
            </Button>
          </Col>
        </Row>
        <Row></Row>
      </Form>
    );
    return (
      <Container className="w-75" fluid>
        {this.props.isLoggedIn ? profile : null}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(Profile);
