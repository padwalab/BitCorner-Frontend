import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Route, useParams } from "react-router";
import { updateProfile } from "../redux/actions/action-helper";
import BillsRecieved from "./BillsRecieved";
import BillsSent from "./BillsSent";
import NewBill from "./NewBill";
import SideBar from "./SideBar";
class Bills extends Component {
  state = {};
  render() {
    let billDashboardHeader = (
      <h1 className="display-5 border-bottom m-2">BILLS DASHBOARD</h1>
    );
    let BillsPage = (
      <React.Fragment>
        <Row>
          <Row>{billDashboardHeader}</Row>
          <Row>
            <Col xs={3}>
              <SideBar />
            </Col>
            <Col xs={9}>
              <Route path="/bills/sent" component={BillsSent} />
              <Route path="/bills/recieved" component={BillsRecieved} />
              <Route path="/bills/new" component={NewBill} />
            </Col>
          </Row>
          {/* <Col>
            <Form.Group>
              <Button
                className="m-2"
                variant="outline-primary"
                disabled={this.state.insufficient}
                onClick={(e) => this.handleBuyOrder()}
              >
                Send Bill
              </Button>
            </Form.Group>
          </Col> */}
        </Row>
        {/* <Row>
          <Col>
            <BillsSent />
          </Col>
          <Col>
            <BillsRecieved />
          </Col>
        </Row> */}
      </React.Fragment>
    );
    return (
      <Container className="w-75">
        <React.Fragment>
          <Row>
            {this.props.isLoggedIn ? BillsPage : <Redirect to="/dashboard" />}
          </Row>
        </React.Fragment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(Bills);
