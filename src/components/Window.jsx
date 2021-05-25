import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import BankAccount from "./BankAccount";
import Bills from "./Bills";
import BitCoin from "./Bitcoin";
import BuyBitCoin from "./BuyBitcoin";
import DashBoard from "./DashBoard";
import NavBar from "./NavBar";
import Profile from "./Profile";
import SellBitCoin from "./SellBitCoin";

import Login from "./Login";


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
        <Route path="/buy" component={BuyBitCoin} />
        <Route path="/sell" component={SellBitCoin} />
        <Route path="/bills" component={Bills} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(Window);
