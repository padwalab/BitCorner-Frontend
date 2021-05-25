import React, { Component } from "react";

class BillsSent extends Component {
  state = {};
  render() {
    let sentBillsHeader = <h2 className="display-6 m-2">BILLS SENT</h2>;
    return (
      <React.Fragment className="border-right">
        {sentBillsHeader}
      </React.Fragment>
    );
  }
}

export default BillsSent;
