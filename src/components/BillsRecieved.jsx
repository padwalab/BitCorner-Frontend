import React, { Component } from "react";

class BillsRecieved extends Component {
  state = {};
  render() {
    let RECIEVEDBillsHeader = <h1 className="display-6 m-2">BILLS RECIEVED</h1>;
    return <React.Fragment>{RECIEVEDBillsHeader}</React.Fragment>;
  }
}

export default BillsRecieved;
