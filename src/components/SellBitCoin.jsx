import axios from "axios";
import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import Bitcoin from "./Bitcoin";
import { updateProfile } from "../redux/actions/action-helper";
import SellOrders from "./SellOrders";
import AllSellOrders from "./AllSellOrders";
import AllBuyOrders from "./AllBuyOrders";
class SellBitCoin extends Component {
  state = {
    SellAmount: 0,
    sellCurrency:
      this.props.currentUser && this.props.currentUser.bankAccount
        ? this.props.currentUser.bankAccount.currency
        : "USD",
    insufficient: false,
    limitAmt: null,
    boolLimit: false,
    availableFunds: 0,
    currencies:
      this.props.currentUser && this.props.currentUser.bankAccount
        ? this.props.currentUser.bankAccount.currencies
        : null,
    success: false,
    warning: false,
  };

  checkFunds = () => {
    this.state.currencies.forEach((item) => {
      if (item.currency === "BTC") {
        item.amount < this.state.SellAmount
          ? this.setState({ insufficient: true, availableFunds: item.amount })
          : this.setState({ insufficient: false, availableFunds: item.amount });
      }
    });
  };

  getOrders = (type) => {
    console.log("fetching orders");
    let res = [];
    let orders =
      this.props.currentUser &&
      this.props.currentUser.bankAccount &&
      this.props.currentUser.bankAccount.orders
        ? this.props.currentUser.bankAccount.orders.forEach((item) => {
            if (item.type === type) {
              res.push(item);
            }
          })
        : [];
    return res;
  };
  handleSellOrder = () => {
    axios
      .post(
        `http://ec2-18-190-25-33.us-east-2.compute.amazonaws.com:8080/api/orders/sell/${this.props.currentUser.id}`,
        {
          units: this.state.SellAmount,
          variant: this.state.boolLimit ? "LIMIT" : "MARKET",
          limitamt: this.state.limitAmt ? this.state.limitAmt : null,
          currency: this.state.sellCurrency,
        }
      )
      .then((res) => {
        this.props.updateProfile(res.data);
        this.setState({ success: true, warning: false });
      })
      .catch((error) => this.setState({ success: false, warning: true }));
  };

  getSellCurrency = () => {
    return this.state.sellCurrency;
  };

  handleSellAmount = async (SellAmount) => {
    await this.setState({ SellAmount });
    await this.checkFunds();
  };
  handleLimitAmount = (limitAmt) => {
    this.setState({ limitAmt });
  };
  handleLimitOrder = () => {
    console.log("this will be limit order");
    this.setState({ boolLimit: !this.state.boolLimit });
  };

  render() {
    let SELLBitcoinHeader = <h1 className="display-5 m-2">SELL BITCOIN</h1>;
    let currencyTypes = ["USD", "INR", "GBP", "EUR"];
    return (
      <Container className="w-75">
        <Row>
          {this.state.warning ? (
            <Alert variant="danger">Buy Order Failed</Alert>
          ) : null}
          {this.state.success ? (
            <Alert variant="success">Buy Order placed</Alert>
          ) : null}
          <Card className="m-2" bg="light" text="dark">
            <Card.Header as="h5" className="m-2">
              <Row className="m-2">
                <Col className="m-2">
                  <Row>{SELLBitcoinHeader}</Row>
                  <Row className="mx-2">
                    Units Available: {this.state.availableFunds}
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Typeahead
                      className="m-2"
                      id="basic-typeahead-single"
                      labelKey="name"
                      single
                      onChange={(e) => this.setState({ sellCurrency: e[0] })}
                      options={currencyTypes}
                      placeholder="Choose Buy Currency type..."
                    />
                  </Row>
                  <Row className="m-2">
                    Transacting using: {this.state.sellCurrency}
                  </Row>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="m-2">
              <Card.Title className="m-2">
                <Col className="m-2">
                  <Bitcoin className="m-2" getCurrency={this.getSellCurrency} />
                </Col>
              </Card.Title>
              <Row className="border-bottom m-3">
                <Col xs={3} className="m-2">
                  <Form.Group className="m-2">
                    <Form.Control
                      className="m-2"
                      onChange={(e) => {
                        this.handleSellAmount(e.target.value);
                      }}
                      type="number"
                      value={this.state.SellAmount}
                    />
                    <Form.Text
                      style={{ color: "red" }}
                      className="m-2"
                      hidden={!this.state.insufficient}
                      muted
                    >
                      INSUFFICIENT BTC!!
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col xs={2} className="m-2">
                  <Form.Group>
                    <Form.Check
                      className="m-2"
                      type="checkbox"
                      label="LMT ORDER"
                      onClick={(e) => this.handleLimitOrder()}
                    />
                    <Form.Control
                      className="m-2"
                      onChange={(e) => {
                        this.handleLimitAmount(e.target.value);
                      }}
                      type="number"
                      value={this.state.limitAmt}
                      hidden={!this.state.boolLimit}
                    />
                  </Form.Group>
                </Col>
                <Col xs={3} className="m-2">
                  <Form.Group>
                    <Button
                      className="m-2"
                      variant="outline-primary"
                      disabled={this.state.insufficient}
                      onClick={(e) => this.handleSellOrder()}
                    >
                      Sell
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="m-2">
                <Col className="m-2">
                  <AllBuyOrders getCurrency={this.getSellCurrency} />
                </Col>
                <Col className="m-2">
                  <SellOrders className="m-2" orders={this.getOrders} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateProfile })(SellBitCoin);
