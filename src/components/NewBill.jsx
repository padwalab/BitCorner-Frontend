import axios from "axios";
import React, { Component } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import { updateProfile } from "../redux/actions/action-helper";
import * as V1APIS from "../apis/v1";
class NewBill extends Component {
  state = {
    warning: false,
    success: false,
    payerEmail: "",
    description: "",
    currency: "",
    amount: 0,
    dueDate: "",
    sender: this.props.currentUser.id,
  };
  handleCreateBill = (e) => {
    e.preventDefault();
    //   Make the apis call here
    axios
      .post(`http://${V1APIS.SERVER}/api/bills`, {
        ...this.state,
      })
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
  handlePayerEmail = (payerEmail) => {
    this.setState({ payerEmail });
  };
  handleDescription = (description) => {
    this.setState({ description });
  };
  handleCurrency = (currency) => {
    this.setState({ currency });
  };
  handleAmount = (amount) => {
    this.setState({ amount });
  };
  handleDueDate = (dueDate) => {
    this.setState({ dueDate });
  };
  render() {
    let currencyTypes = ["USD", "INR", "GBP", "EUR", "BTC"];
    let createBillsHeader = (
      <h1 className="display-6 m-2">CREATE & SEND A BILL</h1>
    );

    let CreateBillForm = (
      <Form className="w-50" onSubmit={(e) => this.handleCreateBill(e)}>
        {this.state.warning ? (
          <Alert variant="danger">Send Bill Failed</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Send Bill Success</Alert>
        ) : null}

        <Row>
          <Form.Label className="m-2 display-5">{createBillsHeader}</Form.Label>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Payer Email:</Form.Label>
            <Form.Control
              onChange={(e) => this.handlePayerEmail(e.target.value)}
              type="text"
              value={this.state.payerEmail}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              onChange={(e) => this.handleDescription(e.target.value)}
              type="text"
              value={this.state.description}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Default Currency:</Form.Label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              single
              onChange={(e) => this.handleCurrency(e[0])}
              options={currencyTypes}
              // selected={this.state.currency}
              placeholder="Choose Currency type..."
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              onChange={(e) => this.handleAmount(e.target.value)}
              type="number"
              value={this.state.amount}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Due Date:</Form.Label>
            <Form.Control
              onChange={(e) => this.handleDueDate(e.target.value)}
              type="string"
              value={this.state.dueDate}
            />
          </Form.Group>
          <Button
            size="sm"
            className="justify-content-end m-2"
            variant="outline-primary"
            type="submit"
          >
            Send Bill
          </Button>
        </Row>
      </Form>
    );
    return <React.Fragment>{CreateBillForm}</React.Fragment>;
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(NewBill);
