import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Row className="display-6 border-bottom m-2" as={Link} to="/bills/new">
          Send Bill
        </Row>
        <Row className="display-6 border-bottom m-2" as={Link} to="/bills/sent">
          Sent
        </Row>
        <Row
          className="display-6 border-bottom m-2"
          as={Link}
          to="/bills/recieved"
        >
          Recieved
        </Row>
      </React.Fragment>
    );
  }
}

export default SideBar;
