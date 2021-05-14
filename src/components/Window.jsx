import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import BankAccount from "./BankAccount";
import BitCoin from "./Bitcoin";
import BuyBitCoin from "./BuyBitcoin";
import DashBoard from "./DashBoard";
import NavBar from "./NavBar";
import Profile from "./Profile";
import SellBitCoin from "./SellBitCoin";

import Login from "./Login";
import Login2 from "./Login2";


import SignIn from "./SignIn";
import SignIn2 from "./SignIn2";


class Window extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Route path="/signin2" component={SignIn2} />
        <Route path="/signin" component={SignIn} />
        <Route path="/login2" component={Login2} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/profile" component={Profile} />
        <Route path="/bankAccount" component={BankAccount} />
        <Route path="/buy" component={BuyBitCoin} />
        <Route path="/sell" component={SellBitCoin} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(Window);
