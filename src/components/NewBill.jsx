import React, { Component } from "react";

class NewBill extends Component {
  state = {};
  render() {
    let createBillsHeader = (
      <h1 className="display-6 m-2">CREATE & SEND A BILL</h1>
    );
    return <React.Fragment className="m-2">{createBillsHeader}</React.Fragment>;
  }
}

export default NewBill;
