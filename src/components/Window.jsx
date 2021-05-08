import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import BankAccount from "./BankAccount";
import DashBoard from "./DashBoard";
import Login from "./Login";
import NavBar from "./NavBar";
import Profile from "./Profile";
import SignIn from "./SignIn";

class Window extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Route path="/signin" component={SignIn} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/profile" component={Profile} />
        <Route path="/bankAccount" component={BankAccount} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(Window);
