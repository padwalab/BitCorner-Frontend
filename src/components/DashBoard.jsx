import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { updateProfile } from "../redux/actions/action-helper";

class DashBoard extends Component {
  state = {};
  render() {
    let dashBoard = <h1 className="display-5 m-2">WELCOME TO BITCORNER</h1>;
    return (
      <Container className="w-75">
        {this.props.isLoggedIn ? (
          <React.Fragment>
            <Row>{dashBoard}</Row>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(DashBoard);
