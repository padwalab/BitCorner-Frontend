import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Route path="/signin" component={SignIn} />
        <Route path="/login" component={Login} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(App);
