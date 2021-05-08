import axios from "axios";
import React, { Component } from "react";
import {
  Container,
  Dropdown,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  Alert
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { updateProfile } from "../redux/actions/action-helper";

class BankAccount extends Component {
  state = {
    bankName: this.props.currentUser.bankAccount ? this.props.currentUser.bankAccount.bankName : "First Republic Bank" ,
    country: this.props.currentUser.bankAccount ? this.props.currentUser.bankAccount.country : "US" ,
    accountNumber: this.props.currentUser.bankAccount ? this.props.currentUser.bankAccount.accountNumber : 1234567890 ,
    currency: this.props.currentUser.bankAccount ? this.props.currentUser.bankAccount.currency : "USD" ,
    balance: this.props.currentUser.bankAccount ? this.props.currentUser.bankAccount.balance : 100.0 ,
    success: false,
    warning: false
  };

  handleCreateBankAccount = (e) => {
    e.preventDefault();
    let cloneState = Object.assign({}, this.state);
    delete cloneState.success;
    delete cloneState.warning;
    console.log(this.state);
    axios
      .put(
        `http://localhost:8080/api/users/${this.props.currentUser.id}/addBankAccount`,
        {
          //done
          ...cloneState,
        }
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

  handleBankName = (bankName) => {
    this.setState({ bankName });
  };
  handleCountry = (country) => {
    this.setState({ country });
  };
  handleAccountNumber = (accountNumber) => {
    this.setState({ accountNumber });
  };
  handleCurrency = (currency) => {
    this.setState({ currency });
  };
  handleBalance = (balance) => {
    this.setState({ balance });
  };
  render() {
    let currencyTypes = ["USD", "INR", "GBP"];
    const { bankAccount } = this.props.currentUser;
    let BankAccount = (
      <Form onSubmit={(e) => this.handleCreateBankAccount(e)}>
      {this.state.warning ? (
          <Alert variant="danger">Add Account Failed</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Add Account Success</Alert>
        ) : null}

        <Row>
          <Form.Label className="m-2 display-5">Add A Bank Account:</Form.Label>
        </Row>
        <Row>
          <Col>
            <Form.Group className="m-2">
              <Form.Label className="m-2">Bank Name:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleBankName(e.target.value)}
                type="text"
                value={this.state.bankName}
                
                readOnly={bankAccount ? true : false}
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">Account No:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleAccountNumber(e.target.value)}
                type="number"
                value={this.state.accountNumber}
                
                readOnly={bankAccount ? true : false}
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">Currency:</Form.Label>
              <Typeahead
                className="m-2"
                id="basic-typeahead-single"
                labelKey="name"
                single
                onChange={(e) => this.setState({ currency: e[0] })}
                options={currencyTypes}
                // selected={this.state.currency}
                placeholder="Choose Currency type..."
                readOnly={bankAccount ? true : false}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="m-2">
              <Form.Label className="m-2">Balance Amount:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleBalance(e.target.value)}
                type="number"
                value={this.state.balance}
                
                readOnly={bankAccount ? true : false}
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2">Country:</Form.Label>
              <Form.Control
                className="m-2"
                onChange={(e) => this.handleCountry(e.target.value)}
                type="string"
                value={this.state.country}
                readOnly={bankAccount ? true : false}
              />
            </Form.Group>
            <Form.Group className="m-2">
              <Form.Label className="m-2"></Form.Label>
            </Form.Group>
            <Button
              className="justify-content-end"
              variant="outline-primary"
              type="submit"
              disabled={bankAccount ? true : false}
            >
              Add Account
            </Button>
          </Col>
        </Row>
      </Form>
    );
    return (
      <Container className="w-75">
        {this.props.isLoggedIn ? BankAccount : <Redirect to="/login" />}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(BankAccount);
