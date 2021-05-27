import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
  Form,
  Alert,
  Badge,
} from "react-bootstrap";
import { connect } from "react-redux";
import { updateProfile } from "../redux/actions/action-helper";
import * as V1APIS from "../apis/v1";
class Currency extends Component {
  state = {
    depositAmount: 0,
    withdrawAmount: 0,
    success: false,
    warning: false,
  };

  handleDepositAmount = (depositAmount) => {
    this.setState({ depositAmount });
  };

  handleWithdrawAmount = (withdrawAmount) => {
    this.setState({ withdrawAmount });
  };
  deposit = (currency) => {
    const formData = new FormData();
    formData.append("amount", this.state.depositAmount);
    formData.append("currency", currency);
    axios
      .put(
        `http://${V1APIS.SERVER}/api/accounts/deposit/${this.props.currentUser.id}`,
        formData
      )
      .then((res) => {
        console.log("repsonse data: ", res.data);
        this.setState({ success: true, warning: false });
        this.props.updateProfile(res.data);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ warning: true, success: false });
      });
  };

  withdraw = (currency) => {
    const formData = new FormData();
    formData.append("amount", this.state.withdrawAmount);
    formData.append("currency", currency);
    axios
      .put(
        `http://${V1APIS.SERVER}/api/accounts/withdraw/${this.props.currentUser.id}`,
        formData
      )
      .then((res) => {
        console.log("repsonse data: ", res.data);
        this.setState({ success: true, warning: false });
        this.props.updateProfile(res.data);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ warning: true, success: false });
      });
  };
  render() {
    console.log(this.props.item);
    const { id, currency, amount } = this.props.item;

    return (
      <Container className="col-sm-6">
        {this.state.warning ? <Alert variant="danger">Failed</Alert> : null}
        {this.state.success ? <Alert variant="success">Success</Alert> : null}

        <Card className="m-2" bg="light" text="dark">
          <Card.Header as="h5" title={currency}>
            {currency}{" "}
            {this.props.default ? (
              <Badge pill variant="secondary" bg="light" className="text-dark">
                primary
              </Badge>
            ) : null}
          </Card.Header>
          <Card.Body>
            <Card.Title>Units Available: {amount}</Card.Title>
            <Row>
              <Col xs={3}>
                <Form.Group className="m-2">
                  <Form.Control
                    className="m-2"
                    onChange={(e) => this.handleDepositAmount(e.target.value)}
                    type="number"
                    value={this.state.depositAmount}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Button
                  variant="outline-success"
                  className="m-2"
                  onClick={(e) => this.deposit(currency)}
                >
                  Deposit
                </Button>
              </Col>
            </Row>

            <Row>
              <Col xs={3}>
                <Form.Group className="m-2">
                  <Form.Control
                    className="m-2"
                    onChange={(e) => this.handleWithdrawAmount(e.target.value)}
                    type="number"
                    value={this.state.withdrawAmount}
                  />
                </Form.Group>
              </Col>
              <Col xs={3}>
                <Button
                  variant="outline-danger"
                  className="m-2"
                  onClick={(e) => this.withdraw(currency)}
                  disabled={amount <= this.state.withdrawAmount}
                >
                  Withdraw
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(Currency);
