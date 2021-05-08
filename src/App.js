import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import Window from "./components/Window";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <NavBar />
        <Window />
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(App);
